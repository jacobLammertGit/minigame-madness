const canvas = document.querySelector("#ballfall-canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;
const newGame = document.querySelector("#ballfall-reset");
const left = document.querySelector("#left")
const right = document.querySelector("#right")

let ball = {x: 150, y: 100, r: 8};
let platformH = 10;
let platformW = canvasW;
let plDiff = 100;
let plSpeed = 3;
let leftPressed = false;
let rightPressed = false;
let moveSpeed = 6;
let interval = null;
let scoreInterval = null;
let score = 0;

function randHoleX(){
    return Math.floor(Math.random() * 470);
}

let platforms = [{x: 0, y: canvasH, holeX: randHoleX(), holeW: 25}];

drawBall();
drawPlatforms();
movePlatforms();
navigateBall();
drawScore();
keeptScore();

function keeptScore(){
    setInterval(() => {
    score++;
    plSpeed = plSpeed + .005;
},1000)
}

function movePlatforms(){
    let count = 0;
    if(interval) return;
    interval = setInterval(() => {
        checkGameOver();
        if (count == Math.floor(plDiff / plSpeed)){
            if(platforms.length > 10){
                platforms.splice(0, 4)
            }
        addNewPlatform();
            count = 0;
        }
      
        platforms.forEach((pl) => {
            pl.y -= plSpeed;
        });

        const closest = platforms.find((pl) => ball.y < pl.y + 10 && ball.y > pl.y - ball.r);
        if(closest){
            holdAndDrop(closest);
        }
        else{
            ball.y += 5;
        }

        

        ctx.clearRect(0, 0 ,canvasW, canvasH)
        drawPlatforms();
        drawBall();
        drawScore();
        count++;
    }, 20)
}

function checkGameOver() {
    if(ball.y < -1){
        // alert("Game Over!");
        reset();
    }
}

function reset() {
    ball = {x: 150, y: 100, r: 8};
    platforms = [{x: 0, y: canvasH, holeX: randHoleX(), holeW: 25}];
    clearInterval(interval);
    clearInterval(scoreInterval);
    leftPressed = false;
    rightPressed = false;
    interval = null;
    scoreInterval = null;
    score = 0;
    plSpeed = 3;
    movePlatforms();
}

function addNewPlatform(){
    const lastPlatform = platforms[platforms.length - 1];
    platforms.push({
        x: 0, 
        y: lastPlatform.y + plDiff,
        holeX: randHoleX(), 
        holeW: 25
    });
}

function drawPlatforms(){
    platforms.forEach(pl => {
        createPl(pl)
        createHole(pl);
    });

    function createHole(pl){
        ctx.beginPath();
        ctx.rect(pl.holeX, pl.y, pl.holeW, platformH);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    
    function createPl(pl){
        ctx.beginPath();
        ctx.rect(pl.x, pl.y, platformW, platformH);
        ctx.fillStyle = "#dddcdc";
        ctx.fill();
        ctx.closePath();
    }
}

function holdAndDrop(closest){
    if(ball.y > closest.y - ball.r){
        if(ball.x > closest.holeX && ball.x < closest.holeX + closest.holeW){
            ball.y += 1;
        }
    else{  
        ball.y = closest.y - ball.r;
    }
    } 
}

function drawBall(){
    if(leftPressed && ball.x - ball.r > 0){
        ball.x -= moveSpeed;
    }
    if(rightPressed && ball.x + ball.r < canvasW){
        ball.x += moveSpeed;
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "limegreen";
    ctx.font = "30px 'Silkscreen'";
    ctx.fill();
    ctx.fillText("Score: " + score, 8, 26);
    ctx.closePath();
}

function navigateBall(){
    document.addEventListener("keydown", (e) => {
        if(e.key == "ArrowLeft"){
            leftPressed = true;
        }
        if(e.key == "ArrowRight"){
            rightPressed = true;
        }
    })
    document.addEventListener("keyup", (e) => {
        if(e.key == "ArrowLeft"){
            leftPressed = false;
        }
        if(e.key == "ArrowRight"){
            rightPressed = false;
        }
    })
}

left.addEventListener("click", () =>{
    leftPressed = true;
    rightPressed = false;
})
right.addEventListener("click", () =>{
    rightPressed = true;
    leftPressed = false;
})


