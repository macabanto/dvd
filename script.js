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

var window_size_x = window.innerWidth;
var window_size_y = window.innerHeight;

var position_x = Math.random() * (window_size_x - dvd_div.offsetWidth); // Initial x position
var position_y = Math.random() * (window_size_y - dvd_div.offsetHeight); // Initial y position
var rotation_z = 0; // Initial x rotation is 0

// Generate random deltas for movement
let position_delta_x = Math.random() * 4 + 1; // Values range from 1 ~ 5
let position_delta_y = Math.random() * 4 + 1; // Values range from 1 ~ 5
let rotation_delta_z = Math.random() * 2 + 1;// 5 ~ 15; rotates about x axis ( spinning )

function start_game() {//start button clicked
    dvd_div.style.transform = `translate(${position_x}px, ${position_y}px)`;//moves dvd logo to position
    setInterval(apply_transform, 17); // Applies transform every 10ms
    change_color();
    start_div.classList.replace("visible", "invisible");
    dvd_div.classList.replace("invisible", "visible");
}
// DVD

function change_color() {//cycle colours
    current_color_position = current_color_position+1 == dvd_color_arr.length ? 0 : current_color_position + 1;
    svg_path.setAttribute("fill", dvd_color_arr[current_color_position]);
}

function is_corner(){//determines if dvd logo is in corner, returns true / false if not
    let logo_boundary = dvd_div.getBoundingClientRect();
    // boundary booleans
    var top_boundary = logo_boundary['top'] <= 0;
    var bottom_boundary = logo_boundary['bottom'] >= window_size_y;
    var right_boundary = logo_boundary['right'] <= 0;
    var left_boundary = logo_boundary['left'] >= window_size_x;
    // corner booleans
    // - this all could've been done in 1 line but i prefer my code to fit one horizontal screen length
    var top_left_corner = top_boundary && left_boundary;
    var top_right_corner = top_boundary && right_boundary;
    var bot_left_corner = bottom_boundary && left_boundary;
    var bot_right_corner = bottom_boundary && right_boundary;
    if (top_left_corner || top_right_corner || bot_left_corner || bot_right_corner) {
        return true;
    }
    return false;
}

function is_collided_boundary(){//determines if dvd logo has met boundary, returns true / false if not
    // Window boundary
    let logo_boundary = dvd_div.getBoundingClientRect();
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

function rotate_dvd_div(){//calculates rotation tranform, returns transform as string
    rotation_z += ( rotation_delta_z * rotation_direction_z );
    if (is_collided_boundary()) {//dvd logo hits wall
        // Change 
        rotation_direction_z *= -1;
    } 
    return `rotateZ(${rotation_z}deg)`;
}

function translate_dvd_div() {//calculates translation tranform, returns transform as string
    // Update the position

    position_x += ( position_delta_x * position_direction_x );
    position_y += ( position_delta_y * position_direction_y );

    let logo_boundary = dvd_div.getBoundingClientRect();
    // boundary booleans
    var top_boundary = logo_boundary['top'] <= 0;
    var bottom_boundary = logo_boundary['bottom'] >= window_size_y;
    var right_boundary = logo_boundary['right'] >= window_size_x;
    var left_boundary = logo_boundary['left'] <= 0;

    if (is_corner()) {
        // Corner *reached*... now what...
        dvd_svg.style.transform = 'scale(2, 2)'; // Scale width and height by 200%
        console.log("corner reached!");
        // Change both x and y direction
        direction_x *= -1;
        direction_y *= -1;
    } else {
        if (top_boundary) { // Top boundary reached, go down
            change_color();
            position_direction_y = 1;
            
        }
        if (bottom_boundary) { // Bottom boundary reached, go up
            change_color();
            position_direction_y = -1;
            
        }
        if (left_boundary) { // Left boundary reached, go right
            change_color();
            position_direction_x = 1;
            
        }
        if (right_boundary) { // Right boundary reached, go left
            change_color();
            position_direction_x = -1;
            
        }
    }
    // Apply the CSS transform
    return `translate(${position_x}px, ${position_y}px)`;
}

function apply_transform(){//combines tranforms into single string, returns string
    dvd_div.style.transform = "".concat(translate_dvd_div()," ",rotate_dvd_div());
}
