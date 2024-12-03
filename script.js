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

function start_game() {//start button clicked
    setInterval(translate_dvd_div, 17); // Applies translation every 10ms
    start_div.classList.replace("visible", "invisible");
    dvd_div.classList.replace("invisible", "visible");
    change_color();
}
// DVD

let dvd_div = document.getElementById("dvd_div");
let dvd_svg = document.getElementById("dvd_svg");
let svg_path = document.getElementById("svg_path");

var direction_x = 1;
var direction_y = 1;
var window_x_max = window.innerWidth;
var window_y_max = window.innerHeight;
let posX = Math.random() * (window_x_max - dvd_div.offsetWidth); // Initial x position
let posY = Math.random() * (window_y_max - dvd_div.offsetHeight); // Initial y position
// Generate random deltas for movement
let delta_x = Math.random() * 4 + 1; // Values range from 1 to 5
let delta_y = Math.random() * 4 + 1; // Values range from 1 to 5

function change_color() {
    current_color_position = current_color_position+1 == dvd_color_arr.length ? 0 : current_color_position + 1;
    svg_path.setAttribute("fill", dvd_color_arr[current_color_position]);
}

function translate_dvd_div() {
    // Update the position
    
    posX += delta_x * direction_x;
    posY += delta_y * direction_y;

    // Window boundary
    var top_boundary = posY <= 0;
    var bottom_boundary = posY + dvd_div.offsetHeight >= window_y_max;
    var left_boundary = posX <= 0;
    var right_boundary = posX + dvd_div.offsetWidth >= window_x_max;

    // Corners
    var top_left_corner = top_boundary && left_boundary;
    var top_right_corner = top_boundary && right_boundary;
    var bot_left_corner = bottom_boundary && left_boundary;
    var bot_right_corner = bottom_boundary && right_boundary;

    if (top_left_corner || top_right_corner || bot_left_corner || bot_right_corner) {
        // Corner *reached*... now what...
        dvd_svg.style.transform = 'scale(2, 2)'; // Scale width and height by 200%
        console.log("corner reached!");
        // Change both x and y direction
        direction_x *= -1;
        direction_y *= -1;
    } else {
        if (top_boundary) { // Top boundary reached, go down
            change_color();
            direction_y = 1;
            
        }
        if (bottom_boundary) { // Bottom boundary reached, go up
            change_color();
            direction_y = -1;
            
        }
        if (left_boundary) { // Left boundary reached, go right
            change_color();
            direction_x = 1;
            
        }
        if (right_boundary) { // Right boundary reached, go left
            change_color();
            direction_x = -1;
            
        }
    }

    // Apply the CSS transform
    dvd_div.style.transform = `translate(${posX}px, ${posY}px)`;
    // Log the new positions
    //console.log("Translated x: " + posX + "\nTranslated y: " + posY);
}