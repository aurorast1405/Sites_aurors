var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


var x = 0;
var y = 0;
var x_speed = 10, y_speed = 10;
var img = new Image();
img.src = "frog.png";

var frame = 0
var timer = 0

var up = false
var down = false
var left = false
var right = false


window.onkeydown = function(e)
{
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) left = true;    //Keys.left = true;
    else if (kc === 38) up = true;    //Keys.up = true;
    else if (kc === 39) right = true;    //Keys.right = true;
    else if (kc === 40) down = true;    //Keys.down = true;
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
        x += x_speed;
        if (x >= canvas.width) x = -50;
    }
    if (left) {
        x -= x_speed;
        if (x <= -50) x = canvas.width;
    }
    if (up) {
        y -= y_speed;
        if (y <= -50) y = canvas.height;
    }
    if (down) {
        y += y_speed;
        if (y >= canvas.height) y = -50;
    }
}

function draw(){
    ctx.beginPath();
    ctx.rect(300, 300, 100, 100);
    ctx.fillStyle = "#5d4584";
    ctx.fill();
    ctx.closePath();
}

function look_for_ocassion(){
    if (x >= 220 && x <= 350 && y >= 250 && y <= 350){
        ctx.font = "48px serif";
        ctx.fillStyle = "#9999ff"
        ctx.fillText("ква", 450, 450, 50);
    }
}

function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkButton();
    draw();
    look_for_ocassion();
    ctx.drawImage(img, x, y, 128, 128);
    if (timer == 4) {
        if (frame < 5) {
            frame++;
        }
        else {
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