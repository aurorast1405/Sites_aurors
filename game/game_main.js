var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 60;
var w = canvas.width
var speed_x = 1.5;
var speed_y = -60;
var game_active = false
var lives = 3
var distract = [[w / 2 + 400], [w / 2 - 400, w / 2 - 400], [w / 2 + 400], [w / 2 - 400]]


document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
        distract.shift();
    }

}

function startGame(){
    if (game_active) game_active = false
    else game_active = true
}

function draw_distract(){
    for (let i = 0; i < distract.length; i++){
        for (let j of distract[i]) {
            ctx.beginPath();
            ctx.rect(j, y + speed_y * i, 50, 50);
            ctx.fillStyle = "#002aff";
            ctx.fill();
            ctx.closePath();
        }
    }
}

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
    draw_distract();
    if (game_active) x += speed_x;
    if (distract[0].includes(x - 40) || distract[0].includes(x + 40)){
        speed_x *= -1
        console.log(distract[0] - 40)
    }
    else if (x >= canvas.width / 2 + 500 || x <= canvas.width / 2 - 500){
        lives --
        game_active = false
        restart();
    }

}
function restart(){
    x = canvas.width / 2;
    y = canvas.height - 60;
    speed_x = 1.5;
    speed_y = -60;
    game_active = false
}

setInterval(draw, 10)
//requestAnimationFrame(draw);
