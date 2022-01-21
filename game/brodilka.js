var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var h = ctx.height
var w = ctx.width


var x = 200;
var y = 200;
var x_speed = 10, y_speed = 10;
var img = new Image();
img.src = "frog.png";
var bulb = new Image();
bulb.src = "bulb.png";

var frame = 0
var timer = 0

var up = false
var down = false
var left = false
var right = false
var move = true
var bed = false
var bed_text = 0
var sofa = false
var sofa_text = 0

window.onkeydown = function(e)
{
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) left = true;    //Keys.left = true;
    else if (kc === 38) up = true;    //Keys.up = true;
    else if (kc === 39) right = true;    //Keys.right = true;
    else if (kc === 40) down = true;
    else if (kc === 69) {
        if (bed){
            bed_text += 1
        }
        else if (sofa) sofa_text += 1
    }
}

window.onkeyup = function(e)
{
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) left = false;    //Keys.left = false;
    else if (kc === 38) up = false;    //Keys.up = false;
    else if (kc === 39) right = false;    //Keys.right = false;
    else if (kc === 40) down = false;    //Keys.down = false;
}

function checkButton(){
    if (right){
        if (x <= canvas.width - 158 && (x <= 880 || y <= 580) && (x <= 790 || y >= 70)) x += x_speed;
    }
    if (left) {
        if (x >= -60 && (x > 40 || (y >= 320 || y <= -40))) x -= x_speed;
    }
    if (up) {
        if (y >= -40 && (x > -30 || (y >= 320 || y <= -40)) && (x <= 790 || y >= 80)) y -= y_speed;
    }
    if (down) {
        if (y <= canvas.height - 128 && (x > -30 || (y >= 320 && y <= -40)) && (y <= 570 || x <= 870)) y += y_speed;
    }
}

function draw_obj(){
    ctx.font = "48px serif"
    if (bed_text === 1) {
        ctx.fillStyle = "#9e9ca2"
        ctx.rect(400, 300, 300, 150)
        ctx.fill()
        ctx.fillStyle = "#080808"
        ctx.fillText("ONE", 450, 350)
    }
    else if (bed_text === 2) {
        ctx.fillStyle = "#9e9ca2"
        ctx.rect(400, 300, 300, 150)
        ctx.fill()
        ctx.fillStyle = "#080808"
        ctx.fillText("TWO", 450, 350)
    }
    else if (bed_text == 3) bed_text = 0;
}


function look_for_ocassion(){
    if (x >= -20 && x <= 620 && y >= 480 && y <= 560){
        ctx.drawImage(bulb, 100, 500, 50, 50);
        bed = true
    }
    else bed = false
    if (x >= 380 && x <= 680 && y <= -10 && y >= -50){
        ctx.drawImage(bulb, 350, 10, 50, 50);
        sofa = true
    }
}

function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (move) checkButton();
    look_for_ocassion();
    draw_obj();
    ctx.drawImage(img, x, y, 228, 228);

    if (timer === 4) {
        if (frame < 5) {
            frame++;
        }
        else {
            console.log(x, y)
            frame = 0;
        }
        timer = 0;
    }
    else {
        timer++;
    }
    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
