const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector("#game-status");
const newGame = document.querySelector("#new-game");

const winConditions = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "" , "" ,"", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    newGame.addEventListener("click", resetGame);
    gameStatus.innerText = `${currentPlayer}'s turn`
    running = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex")

    if(options[boxIndex] != "" || !running){
        return;
    }

    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;
    box.innerText = currentPlayer;
}

function changePlayer () {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameStatus.innerText = `${currentPlayer}'s turn`
} 

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        gameStatus.innerText = `${currentPlayer} wins!`
        gameStatus.style.color = "#c41104";
        running = false;
    }
    else if(!options.includes("")){
        gameStatus.innerText = "Draw!";
        running = false;
    }
    else{
        changePlayer();
    }

}

function resetGame() {
    currentPlayer = "X";
    gameStatus.style.color = "#262626";
    options = ["", "" , "" ,"", "", "", "", "", ""];
    gameStatus.innerText = `${currentPlayer}'s turn`
    boxes.forEach(box => box.textContent = "");
    running = true;
}