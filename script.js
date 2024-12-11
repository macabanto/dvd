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

let dvd_div = document.getElementById("dvd_div");
let dvd_svg = document.getElementById("dvd_svg");

var position_direction_x = 1;
var position_direction_y = 1;
var rotation_direction_z = 1;//x axis points normal to display

var window_size_x = 0;
var window_size_y = 0;

var position_x = 0; // Initial x position
var position_y = 0; // Initial y position
var rotation_z = 0; // Initial x rotation is 0

// Generate random deltas for movement
let position_delta_x = Math.random() * 4 + 1; // Values range from 1 ~ 5
let position_delta_y = Math.random() * 4 + 1; // Values range from 1 ~ 5
let rotation_delta_z = Math.random() * 2 + 1;// 5 ~ 15; rotates about x axis ( spinning )

function start_game() {//start button clicked
    window_size_x = window.innerWidth;//setting window size 
    window_size_y = window.innerHeight; //setting window size 

    setInterval(transform_dvd_div, 17); // Applies transform every 10ms

    position_x = Math.random() * (window_size_x - dvd_div.offsetWidth); // Initial x position
    position_y = Math.random() * (window_size_y - dvd_div.offsetHeight); // Initial y position
    
    change_color();
    dvd_div.style.transform = `translate(${position_x}px, ${position_y}px)`;//moves dvd logo to position
    start_div.classList.replace("visible", "invisible");
    dvd_div.classList.replace("invisible", "visible");
}
// DVD

function change_color() {//cycle colours
    current_color_position = current_color_position+1 == dvd_color_arr.length ? 0 : current_color_position + 1;
    svg_path.setAttribute("fill", dvd_color_arr[current_color_position]);
}

function is_collided_boundary(){//determines if dvd logo has met boundary, returns true / false if not
    // Window boundary
    let logo_boundary = dvd_svg.getBoundingClientRect();
    if(
        logo_boundary['top'] <= 0 ||
        logo_boundary['bottom'] >= window_size_y ||
        logo_boundary['right'] >= window_size_x ||
        logo_boundary['left'] <= 0
    ){
        console.log('boop');
        return true; 
    }
    else return false;
}

function transform_dvd_div() {//calculates translation tranform, returns transform as string
    // Update the position

    position_x += ( position_delta_x * position_direction_x );
    position_y += ( position_delta_y * position_direction_y );
    rotation_z += ( rotation_delta_z * rotation_direction_z );

    let logo_boundary = dvd_svg.getBoundingClientRect();
    // boundary booleans
    var top_boundary = logo_boundary['top'] <= 0;
    var bottom_boundary = logo_boundary['bottom'] >= window_size_y;
    var right_boundary = logo_boundary['right'] >= window_size_x;
    var left_boundary = logo_boundary['left'] <= 0;
    if( is_collided_boundary()){
        rotation_direction_z *= -1;
        change_color();
        if (top_boundary) { // Top boundary reached, go down
            position_direction_y = 1;
        }
        if (bottom_boundary) { // Bottom boundary reached, go up
            position_direction_y = -1;
        }
        if (left_boundary) { // Left boundary reached, go right
            position_direction_x = 1;
        }
        if (right_boundary) { // Right boundary reached, go left
            position_direction_x = -1;
        }
    }
    
    // Apply the CSS transform
    dvd_div.style.transform = `translate(${position_x}px, ${position_y}px) rotateZ(${rotation_z}deg)`;
}

