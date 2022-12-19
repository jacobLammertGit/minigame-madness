const canvas = document.querySelector("#snake-game");
const ctx = canvas.getContext("2d");
const reset = document.querySelector("#snake-reset");
const up = document.querySelector("#up")
const down = document.querySelector("#down")
const left = document.querySelector("#left")
const right = document.querySelector("#right")

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    //walls
    if(headX < 0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = "#636969";
        ctx.font = "50px Silkscreen";
        ctx.fillText("Game Over!", canvas.width / 12, canvas.height / 2);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "#3f4242";
    ctx.font = "20px 'Silkscreen'"
    ctx.fillText("Score: " + score, canvas.width - 125, 20)
}

function clearScreen(){
    ctx.fillStyle = "#84d07d"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

function drawSnake(){
    ctx.fillStyle = "#272929";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle = "#323636";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "#306230";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        speed = speed + 0.2;
    }
}

document.body.addEventListener("keydown", keyDown);
up.addEventListener("click", buttonUp);
down.addEventListener("click", buttonDown);
left.addEventListener("click", buttonLeft);
right.addEventListener("click", buttonRight);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
        event.preventDefault();
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
        event.preventDefault();
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
        event.preventDefault();
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
        event.preventDefault();
    }
}

//for buttons
function buttonUp(event){
    if(up){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
}

function buttonDown(event){
    if(down){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
}

function buttonLeft(event){
    if(left){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
}

function buttonRight(event){
    if(right){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}



drawGame();

reset.addEventListener("click", () => {
    window.location.reload()
});
