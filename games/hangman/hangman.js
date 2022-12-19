const keyboard = document.querySelector("#keyboard");
const currentWord = document.querySelector('.hang-word');
const hangPic = document.querySelector(".hang-pic");
const hangText = document.querySelector(".hang-text");
const newGame = document.querySelector("#hang-reset");


let answer = "";
let mistakes = 0;
let maxWrong = 6
let guessed = [];
let wordStatus = null;

function randWord(){
    const randNum = Math.floor(Math.random() * words.length) + 1;
    answer = words[randNum];
}

function generateButtons(){
    let buttonHTML = "abcdefghijklmnopqrstuvwxyz".split('').map(letter => 
        `
            <button
            class="hang-button"
            id = ` + letter +`
            onclick="handleGuess('` + letter + `')"
            >
            ` + letter + `
            </button>
        `).join("");
    keyboard.innerHTML = buttonHTML;
}

function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: " _ ")).join('');
    currentWord.innerHTML = wordStatus;
}

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkGameWon();
    }
    else  if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        checkGameLoss();
        updatePic();
    }
}

function updatePic(){
    hangPic.src = `./hangmanPics/${mistakes}.JPG`
}

function checkGameWon(){
    if(wordStatus === answer){
        hangPic.src = "./hangmanPics/7.JPG"
        currentWord.style.color = "green"
        keyboard.innerHTML = ""
    }
}

function checkGameLoss(){
    if(mistakes === maxWrong){
        currentWord.innerHTML = answer;
        currentWord.style.color = "red"
        keyboard.innerHTML = ""
    }
}

function reset(){
    mistakes = 0;
    guessed = [];
    hangText.innerText = "Guess the correct word:"
    currentWord.style.color = "black"
    hangPic.src = "./hangmanPics/0.JPG"

    randWord();
    guessedWord();
    generateButtons();
}

newGame.addEventListener('click', reset)

randWord();
generateButtons();
guessedWord();