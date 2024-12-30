// START
let start_div = document.getElementById("start_div");
// array stores paths for dvd.svg files: use this to alternate between colors

window.onload = () => {
    document.getElementById("start-button_p").addEventListener("click", start_game);
    window.addEventListener('keydown', function(event){
        if(event.key === " "){
            start_game();
        }
    })
};

// GAME
var interval = 1000;//time in ms for new dvdlogo to appear
const SCORE = document.getElementById('score_p');
var window_size_x = 0;
var window_size_y = 0;

function start_game() {
    toggleMenu();
    toggleFullscreen();
    window_size_x = window.innerWidth;//setting window size 
    window_size_y = window.innerHeight; //setting window size 
    let d=DVDLogo(1, 2, 3, 400, 500);
    setInterval(transform_dvd_div, 17); // Applies transform every 10ms


}

function toggleMenu() {
    document.getElementById("start-menu_div").classList.replace("visible_div", "invisible_div");
    document.getElementById("play_div").classList.replace("invisible_div", "visible_div");
}

function toggleFullscreen() {
    let elem = document.querySelector("body");
  
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
}

function DVDLogo(color_index, delta_x, delta_y, position_x, position_y){
    //element will have values : color_index, delta_x, delta_y, position_x, position_y, 
    const svg_string=''
    const dvd_color_arr =
    [
        "#f54242",
        "#f58442",
        "#f5d142",
        "#72f542",
        "#42f581",
        "#42f5e9",
        "#428af5",
        "#8a42f5",
        "#ef42f5",
        "#f54260",
    ]
    this.color_index=color_index;
    this.color=dvd_color_arr[this.color_index];
    this.delta_x=delta_x;
    this.delta_y=delta_y;
    this.position_x=position_x;
    this.position_y=position_y;
    this.translate=function(){
        this.position_x+=this.delta_x;
        this.position_y+=this.delta_y;
    }
    this.change_color=function(){
        this.color_index=(this.color_index>=dvd_color_arr.length ? 0 : this.color_index+1)
    }

}

function transform_svg() {//calculates and applies transform to div
    // Update the position
    let logo_boundary = dvd_svg.getBoundingClientRect();//getting svg location
    // boundary booleans
    var top_boundary = logo_boundary['top'] <= 0;
    var bottom_boundary = logo_boundary['bottom'] >= window_size_y;
    var right_boundary = logo_boundary['right'] >= window_size_x;
    var left_boundary = logo_boundary['left'] <= 0;
    boundary = 0;
        if (top_boundary) { // Top boundary reached, go down
            rotation_direction_z *= -1;
            change_color();
            position_direction_y = 1;
            let bounce_value = parseInt(bounces.innerText);
            bounces.innerText = ( bounce_value + 1 );
            boundary = 1;
        }
        if (bottom_boundary) { // Bottom boundary reached, go up
            rotation_direction_z *= -1;
            change_color();
            position_direction_y = -1;
            let bounce_value = parseInt(bounces.innerText);
            bounces.innerText = ( bounce_value + 1 );
            boundary = 1;
        }
        if (left_boundary) { // Left boundary reached, go right
            rotation_direction_z *= -1;
            change_color();
            position_direction_x = 1;
            let bounce_value = parseInt(bounces.innerText);
            bounces.innerText = ( bounce_value + 1 );
            boundary = 1;
        }
        if (right_boundary) { // Right boundary reached, go left
            rotation_direction_z *= -1;
            change_color();
            position_direction_x = -1;
            let bounce_value = parseInt(bounces.innerText);
            bounces.innerText = ( bounce_value + 1 );
            boundary = 1;
        }

        position_x += ( position_delta_x * position_direction_x );
        position_y += ( position_delta_y * position_direction_y );
    
    // Apply the CSS transform
    dvd_svg.style.transform = `translate(${position_x}px, ${position_y}px)`;
}