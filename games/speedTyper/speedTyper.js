const head = document.querySelector(".typer-head");
const gameCounter = document.querySelector(".typer-seconds")
const seconds = document.querySelector(".typer-seconds-num");
const word = document.querySelector(".typer-word");
const gameOver = document.querySelector(".typer-gameover");
const wordInput = document.querySelector(".typer-input");
const scoreNum = document.querySelector(".typer-score-num");
const reset = document.querySelector(".typer-reset")

let time = 10;
let score = 0;
let isPlaying;
let countdownInterval = setInterval(countdown, 1000);
let statusInterval = setInterval(checkStatus, 50);

function init(){
    showWord(words);
    wordInput.addEventListener('input', startMatch);
    countdownInterval;
    statusInterval;
}

init();

function startMatch(){
    if(matchWords()){
      isPlaying = true;
      showWord(words);
      wordInput.value = "";
      score++;
      scoreNum.innerText = score
      if(score >= 5 && score < 10){
        time = 6
      }
      else if(score >= 10 &&  score < 20){
        time = 4;
      }
      else if(score >= 20 && score < 30){
        time = 3;
      }
      else if(score >= 30){
        time = 2;
      }
      else{
        time = 11;
      }
    }
}

function matchWords(){
    if(wordInput.value.toLowerCase() === word.innerHTML.toLowerCase()){
        return true;
    }
    else{
        return false;
    }
}

function showWord(words){
    const randNum = Math.floor(Math.random() * words.length) + 1;
    word.innerHTML = words[randNum]
}

function countdown(){
    if(time > 0){
        time--;
    }else if (time === 0){
        isPlaying = false;
    }
    seconds.innerHTML = time;
}

function checkStatus(){
    if(!isPlaying && time === 0){
        gameOver.innerText = "Game Over!"
        seconds.style.color = "red";
        wordInput.disabled = true;
    }
}

function resetGame(){
    time = 11;
    score = 0;
    isPlaying;
    scoreNum.innerText = "0";
    wordInput.value = "";
    gameOver.innerText = "";
    seconds.style.color = "green";
    wordInput.disabled = false;
    clearInterval(countdownInterval);
    clearInterval(statusInterval);
    countdownInterval = setInterval(countdown, 1000);
    statusInterval = setInterval(checkStatus, 50);
    init();
}

reset.addEventListener('click', resetGame);

