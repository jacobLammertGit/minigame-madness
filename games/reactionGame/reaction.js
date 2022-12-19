const html = document.querySelector('html');
const body = document.querySelector('.react-body');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('.react-title');
const p = document.querySelector('.react-p');

const changeTimeMin = 500;
const changeTimeMax = 6000;

let msSinceStart = 0;
let clicked = false;

function gameStart() {
    const msTillChange = Math.floor(Math.random() * (changeTimeMax - changeTimeMin)) + changeTimeMin;
    body.style.transition = "0.3s";
    body.style.backgroundColor = "#0d0d0d";
    h2.innerText = "Ready your flashlight..";
    p.innerText = "";
    h1.classList.add('hide');
    setTimeout(() => {
        msSinceStart = Date.now();
        body.style.backgroundColor = "#0d0d0d";
        h1.classList.remove('hide');
        h2.innerText = "BOO!"
        p.innerText = "CLICK NOW";
        clicked = true;
    }, msTillChange)
}

html.addEventListener('click', () => {
    if(clicked){
        const score = Date.now() - msSinceStart;
        clicked = false;
        body.style.backgroundColor = "#482592";
        body.style.transition = "0.1s";
        h2.innerText = `${score}ms!`;
        p.innerText = "click to turn the lights back off..";
    }
        else{
            gameStart(); 
    }
});
