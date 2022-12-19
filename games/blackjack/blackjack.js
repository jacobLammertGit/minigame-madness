const reset = document.querySelector("#black-reset");
const dealerCards = document.querySelector("#dealer-cards");
const yourCards = document.querySelector("#your-cards");
const dealerSumNum = document.querySelector("#dealer-sum");
const yourSumNum = document.querySelector("#your-sum");
const hitBtn = document.querySelector("#hit");
const stayBtn = document.querySelector("#stay");
const winnerDisplay = document.querySelector("#results")


let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

function startGame(){
    buildDeck();
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        card = deck.pop();
        cardImg.src = `./cards/${card}.png`
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        dealerCards.append(cardImg);
    }

    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        card = deck.pop();
        cardImg.src = `./cards/${card}.png`
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        yourCards.append(cardImg);
    }
    hitBtn.addEventListener("click", hit);
    stayBtn.addEventListener("click", stay);
}

function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img");
        card = deck.pop();
        cardImg.src = `./cards/${card}.png`
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        yourCards.append(cardImg);

        if(reduceAce(yourSum, yourAceCount) > 21) {
            canHit = false;
        }

}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.querySelector("#hidden").src = `./cards/${hidden}.png`
    let message = "";
    if (yourSum > 21){
        message = "You Lose!";
    }
    else if(dealerSum > 21){
        message = "You Win!";
    }
    else if(yourSum == dealerSum){
        message = "Tie!";
    }
    else if(yourSum > dealerSum){
        message = "You Win!";
    }
    else if(yourSum < dealerSum){
        message = "You Lose!";
    }

    dealerSumNum.innerText = dealerSum;
    yourSumNum.innerText = yourSum;
    winnerDisplay.innerText = message;
}

function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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


function getValue(card){
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}

startGame();

function resetGame(){
    deck = [];
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    canHit = true
    dealerCards.innerHTML = '<img id="hidden" src="../back.png" alt="">';
    yourCards.innerHTML = "";
    winnerDisplay.innerText = "";
    dealerSumNum.innerText = "";
    yourSumNum.innerText = "";
    startGame();
}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

reset.addEventListener("click", resetGame);

