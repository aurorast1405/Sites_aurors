var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 60;
var speed_x = 1.5;
var speed_y = -20;



// function drawDistraction() {
//     ctx.beginPath();
//     ctx.rect(canvas.width / 2 + 100, canvas.height - 60, 50, 50);
//     ctx.fillStyle = "#FF0000";
//     ctx.fill();
//     ctx.closePath();
//
// }

function drawObject() {
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObject();
    // drawDistraction();
    x += speed_x;
    if (x >= canvas.width - 40 || x <= 0){
        speed_x *= -1
        console.log(speed_x)
    }
}

setInterval(draw, 10);