const tableRow = document.getElementsByTagName("tr");
const table = document.querySelector("table");
const tableCell = document.getElementsByTagName("td");
const tableBox = document.querySelectorAll(".memory-box");
const newGame = document.querySelector("#memory-reset");
const memoryBoard = document.querySelector(".memory-board")
let score = document.querySelector(".memory-score");
let lives = document.querySelector(".memory-lives")

let emojis = ["&#128018", "&#128018", "&#129421", "&#129421", "&#128021", "&#128021", "&#128041", "&#128041", "&#128008", "&#128008", "&#128014", "&#128014", "&#129420", "&#129420", "&#128004", "&#128004", "&#128022", "&#128022", "&#128042", "&#128042", "&#128024", "&#128024", "&#128000", "&#128000", "&#128007", "&#128007", "&#129415", "&#129415", "&#x1F986", "&#x1F986"];

shuffleArray(emojis);

let choiceOne = null; //saves first choice
let choiceTwo = null; //saves second choice
let boxOne = null; //saves first choices box
let boxTwo = null; //saves second choices box
let choiceNum = 1;
let livesNum = 25;
let matches = 0

let emojiNum = 0;

function shuffleCards(){
    for (const row of table.rows) {  
        for (const cell of row.cells) {  
          cell.classList.remove('text-match');
          cell.innerHTML = emojis[emojiNum];
          emojiNum++;
        }  
      }
}

shuffleCards();

for (const box of tableBox) {
    if(choiceNum == 1){
        box.addEventListener('click', function onClick() {
            box.classList.remove('text-hide');
            if (choiceNum == 1 && livesNum != 0){
                choiceOne = event.target.innerText;
                boxOne = event.target;
                boxOne.classList.add('text-match');
                choiceNum++;
            }
            else if (choiceNum == 2 && livesNum != 0){
                choiceTwo = event.target.innerText;
                boxTwo = event.target;
                boxTwo.classList.add('text-match');
                if (choiceOne == choiceTwo){
                    matches++;
                    box.classList.add('text-match');
                    choiceOne = null;
                    choiceTwo = null;
                    boxOne.classList.add('text-match');
                    boxTwo.classList.add('text-match');
                    if(matches == 15){
                        memoryBoard.style.backgroundColor = "green";
                        lives.innerText = "YOU WIN!"
                    }
                }
                else{
                    livesNum--;
                    lives.innerText = `Lives: ${livesNum}`;
                    choiceOne = null;
                    choiceTwo = null;
                    boxOne.classList.remove('text-match');
                    boxTwo.classList.remove('text-match');
                    setTimeout(() => boxOne.classList.add('text-hide'), 500);
                    setTimeout(() => boxTwo.classList.add('text-hide'), 500);
                    if(livesNum == 0){
                        lives.style.color = "red";
                        table.classList.add('text-match')
                        memoryBoard.style.backgroundColor = "red";
                    }
                }
                choiceNum = 1;
            }
        });
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function hideBox(){
    for (const box of tableBox){
        box.classList.add('text-hide');
    }
}

newGame.addEventListener("click", () => {
    choiceOne = null;
    choiceTwo = null;
    lives.style.color = "black";
    livesNum = 25;
    emojiNum = 0;
    matches = 0
    lives.innerText = "Lives: 25";
    shuffleArray(emojis);
    shuffleCards();
    hideBox();
    table.classList.remove('text-match')
    boxOne.classList.remove('text-match');
    boxTwo.classList.remove('text-match');
    memoryBoard.style.backgroundColor = "#7694a4";
}) 







  