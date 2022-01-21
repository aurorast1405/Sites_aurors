var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 60;
var gamer_y = canvas.height - 60;
var w = canvas.width
var speed_x = 10
var speed_y = -60;
var game_active = false
var lives = 3
var delta = 400
var distract = [[w / 2 + 400], [w / 2 + 400], [w / 2 - 400, w / 2 + 400], [w / 2 + 400], [w / 2 - 400], [w / 2 + 400], [w / 2 - 400, w / 2 + 400], [w / 2 - 400, w / 2 + 400]]
var frameCount = 0
var count = 0;
var frameCounterBefore = -1;
var fps, fpsInterval, startTime, now, then, elapsed;


var timer = 0
var flag = true
var im = new Image()
im.src = 'game02.png'
var img = new Image();
img.src = 'game01.png';
var distracting = new Image()
distracting.src = 'game03.png'



document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener('touchstart', function(event) {
//     if (event.targetTouches.length === 1) {
//         var myclick =event.targetTouches[0];
//         y += speed_y
//         y -= speed_y
//         distract.shift();
//         random_push();
//
//     }
// }, false);

function keyDownHandler(e) {
    if (Math.abs(frameCounterBefore - frameCount) >= 15) {
        if (e.key === "Up" || e.key === "ArrowUp" && game_active) {
            let before = Date.now()
            distract.shift();
            count++
            if (count >= 20 && delta >= 100){
                delta -= 10
                count = 0
            }
            random_push();
        }
        frameCounterBefore = frameCount
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function random_push(){
    while (distract.length <= 8) {
        let var_arr = [0, 0, 1, 1, 2, 2]
        let p = var_arr[getRandomInt(5)]
        if (p === 2) {
            distract.push([w / 2 - delta, w / 2 + delta])
        } else if (p === 1) {
            if (distract[distract.length - 1][0] === w / 2 - delta) {
                var_arr = [0, 1, 1, 1]
            } else {
                var_arr = [1, 0, 0, 0]
            }
            let p = var_arr[getRandomInt(3)]
            if (p === 0) {
                distract.push([w / 2 - delta])
            } else {
                distract.push([w / 2 + delta])
            }
        }
    }
}

function startGame(){
    game_active = game_active ? false : true;
}

function draw_distract(){
    for (let i = 0; i < distract.length; i++){
        for (let j of distract[i]) {
            //ctx.drawImage(distracting, j, y+speed_y * i, 80, 80)
            ctx.beginPath();
            ctx.rect(j, y + speed_y * i, 50, 50);
            ctx.fillStyle = "#002aff";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawObject(imgage) {
    ctx.drawImage(imgage, x, gamer_y, 60, 60)
}

function restart(){
    x = canvas.width / 2;
    y = canvas.height - 60;
    gamer_y = canvas.height - 60;
    game_active = false
}

function restart_the_game(){
    ctx.font = "48px serif";
    ctx.fillStyle = "#9999ff"
    ctx.fillText("Game Over", 500, 250);
    then += 5000
    lives = 3
    distract = [[w / 2 + 400], [w / 2 + 400], [w / 2 - 400, w / 2 + 400], [w / 2 + 400], [w / 2 - 400], [w / 2 + 400], [w / 2 - 400, w / 2 + 400], [w / 2 - 400, w / 2 + 400]]
    game_active = false
    speed_x = 10;
    speed_y = -60;
    delta = 400
}

function check(){
    if (distract[0].includes(x - 40) || distract[0].includes(x + 40)){
        speed_x *= -1
    }
    else if (x >= (canvas.width / 2 + 500) || x <= canvas.width / 2 - 500){
        lives --
        game_active = false
        restart();
    }
    if (lives <= 0){
        game_active = false
        restart_the_game();
    }
}

function draw() {
    requestAnimationFrame(draw);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        frameCount++
        frameCount %= 1000
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (flag) {
            drawObject(img)
            if (timer == 3) {
                flag = false
                timer = 0
            }
            else{
                timer++
            }
        }
        else {
            drawObject(im)
            if (timer == 3) {
                flag = true
                timer = 0
            } else timer++
        }
        draw_distract();
        if (game_active) x += speed_x;
        check();
    }
}

function startAnimating(fps) {
    fpsInterval = 100 / fps;
    then = Date.now();
    startTime = then;
    draw();
}


requestAnimationFrame(startAnimating);
