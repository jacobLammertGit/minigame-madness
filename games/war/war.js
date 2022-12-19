const p1Score = document.querySelector("#player1-score");
const p2Score = document.querySelector("#player2-score");
const p1Cards = document.querySelector("#player1-cards");
const p2Cards = document.querySelector("#player2-cards");
const turnNum = document.querySelector(".turn-num");
const sayWinner = document.querySelector(".say-winner")
const turnNumP = document.querySelector(".turn-num-p")
const drawBtn = document.querySelector("#war-draw");
const resetBtn = document.querySelector("#war-reset");

let player1Score = 0;
let player2Score = 0;
let numCards = 26;

let hidden;
let deck;
let card;

function startGame(){
        buildDeck();
        drawBtn.addEventListener("click", drawCard)
        resetBtn.addEventListener("click", resetGame)
}

function buildDeck(){
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];//11-14 is jack-ace
    let types = ["C", "D", "H", "S"];
    deck = [];

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
    shuffleDeck();
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function checkWinner(){
    let data1 = p1Card.split("-");
    let value1 = data1[0];
    num1 = parseInt(value1);
    console.log(num1)
    let data2 = p2Card.split("-");
    let value2 = data2[0];
    num2 = parseInt(value2);
    console.log(num2)
    if(num1 === num2){
        return;
    }
    else if(num1 > num2){
        player1Score++;
        p1Score.innerText = player1Score;
    }
    else if(num1 < num2){
        player2Score++;
        p2Score.innerText = player2Score;
    }
}


function drawCard(){
    if(numCards == 26){
        let p1CardImg = document.createElement("img");
        let p2CardImg = document.createElement("img");
        p1Card = deck.pop();
        p2Card = deck.pop();
        p1CardImg.src = `./cards/${p1Card}.png`
        p2CardImg.src = `./cards/${p2Card}.png`
        p1Cards.append(p1CardImg);
        p2Cards.append(p2CardImg);
    }
    else if(numCards < 26 || numCards > 0){
        let p1CardImg = document.createElement("img");
        let p2CardImg = document.createElement("img");
        p1Card = deck.pop();
        p2Card = deck.pop();
        p1CardImg.src = `./cards/${p1Card}.png`
        p2CardImg.src = `./cards/${p2Card}.png`
        
        p1Cards.children[1].remove();
        p2Cards.children[1].remove();
        p1Cards.append(p1CardImg);
        p2Cards.append(p2CardImg);
        if (numCards === 1){
            drawBtn.disabled = true;
            if(player1Score > player2Score){
                sayWinner.innerText = "Player 1 Wins!"
            }
            else if(player1Score < player2Score){
                sayWinner.innerText = "Player 2 Wins!"
            }
            else if(player1Score === player2Score){
                sayWinner.innerText = "Tie Game!"
            }
        }
    }
    numCards--;
    turnNum.innerText = numCards;
    checkWinner();
}

function resetGame(){
    p1Cards.innerHTML = '<img src="../back.png" alt="">'
    p2Cards.innerHTML = '<img src="../back.png" alt="">'
    player1Score = 0;
    player2Score = 0;
    numCards = 26;
    sayWinner.innerText = "";
    turnNum.innerText = numCards;
    turnNum.innerText = numCards
    p1Score.innerText = player1Score;
    p2Score.innerText = player2Score;
    drawBtn.disabled = false;
    deck = [];
    buildDeck();
}

startGame();







