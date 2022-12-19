const tableRow = document.getElementsByTagName("tr");
const tableCell = document.getElementsByTagName("td");
const tableSlot = document.querySelectorAll(".slot");
const playerTurn = document.querySelector(".player-turn");
const reset = document.querySelector("#connect-reset");

let playerOne = {
    name: "Player 1",
    color: "#FF1818"
};

let playerTwo = {
    name: "Player 2",
    color: "#FFC300"
};

let running = true;
let turnNumber = 0;

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener("click", changeColor);
    cell.style.backgroundColor = "white";
})

reset.addEventListener("click", () => {
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = "white";
    });
    playerTurn.textContent = `${playerOne.name}'s turn`
    playerTurn.style.color = "black";
    turnNumber = 0;
    running = true;
})

function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i > -1; i--){
        if(tableRow[i].children[column].style.backgroundColor == "white"){
            row.push(tableRow[i].children[column]);
            if (running){
                if(turnNumber % 2 == 0 ){
                    row[0].style.backgroundColor = playerOne.color;
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                        playerTurn.textContent = `${playerOne.name} wins!`
                        playerTurn.style.color = "#FF1818"
                        running = false;
                    }
                    else if(drawCheck()){
                        playerTurn.textContent = "Draw!"
                        running = false;
                    }else{
                    playerTurn.textContent = `${playerTwo.name}'s turn`;
                    return turnNumber++;
                    }
                }
                else{
                    row[0].style.backgroundColor = playerTwo.color;
                    playerTurn.textContent = `${playerOne.name}'s turn`;
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                        playerTurn.textContent = `${playerTwo.name} wins!`
                        playerTurn.style.color = "#FFC300"
                        running = false;
                    }
                    else if(drawCheck()){
                        playerTurn.textContent = "Draw!"
                        running = false;
                    }else{
                    playerTurn.textContent = `${playerOne.name}'s turn`;
                    return turnNumber++;
                    }
                }
            }
         
        }
    }
}

function colorMatch(one, two, three, four){
    return(one == two && one == three && one == four && one !== "white");
}

function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row++){
        for (let col = 0; col < 4; col++){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row].children[col + 1].style.backgroundColor,
                tableRow[row].children[col + 2].style.backgroundColor, 
                tableRow[row].children[col + 3].style.backgroundColor)){
                    return true;
                }
         }
    }
};

function verticalCheck() {
    for (let col = 0; col < 7; col++){
        for(let row = 0; row < 3; row++){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor,
                tableRow[row + 3].children[col].style.backgroundColor))
                return true;
        }
    }
}

function diagonalCheck1(){
    for(let col = 0; col < 4; col++){
        for(row = 0; row < 3; row++){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor,
                tableRow[row + 3].children[col + 3].style.backgroundColor))
                return true;
        }
    }
}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for(row = 5; row > 2; row--){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor,
                tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor,
                tableRow[row - 3].children[col + 3].style.backgroundColor))
                return true;
        }
    }
}

function drawCheck(){
    let fullSlot = [];
    for(let i = 0; i < tableCell.length; i++){
        if(tableCell[i].style.backgroundColor !== "white"){
            fullSlot.push(tableCell[i]);
        }
    }
    if(fullSlot.length === tableCell.length){
        return true;
    }
}



