// START
let start_div = document.getElementById("start_div");
// array stores paths for dvd.svg files: use this to alternate between colors
let dvd_color_arr =
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
var current_color_position = 0;

let play_div = document.getElementById("play_div");
let dvd_svg = document.getElementById("dvd_svg");

var position_direction_x = 1;
var position_direction_y = 1;
var rotation_direction_z = 1;//x axis points normal to display

var window_size_x = 0;
var window_size_y = 0;

var position_x = 0; // Initial x position
var position_y = 0; // Initial y position

var position_delta_x = Math.random() * 3 + 2; // Values range from 3-5
var position_delta_y = Math.random() * 3 + 2; // Values range from 3-5

window.onload = () => {
    document.getElementById("start_button").addEventListener("click", start_game);
    window.addEventListener('keydown', function(event){
        if(event.key === " "){
            start_game();
        }
    })
};

// GAME
var boundary = 0;
var bounces=document.getElementById('bounces');

function start_game() {//applies correct css  making start menu invisible, game visible
    
    window_size_x = window.innerWidth;//setting window size 
    window_size_y = window.innerHeight; //setting window size 

    setInterval(transform_svg, 16.666666666); // Applies transform every 50ms ( 60fps )

    position_x = 100; // Initial x position
    position_y = 100; // Initial y position
    
    change_color();
    dvd_svg.style.transform = `translate(${position_x}px, ${position_y}px)`;//moves dvd logo to position
    start_div.classList.replace("visible", "invisible");
    play_div.classList.replace("invisible", "visible");
}

function change_color() {//cycle colours
    current_color_position = current_color_position+1 == dvd_color_arr.length ? 0 : current_color_position + 1;
    svg_path.setAttribute("fill", dvd_color_arr[current_color_position]);
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