const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const start = document.querySelector('.mash-start');

let score = 0;

start.addEventListener('click', () => {
    score = 0;
    p.innerText = "";
    countdown();
      setTimeout(() => {
      aKeyPress();
      setTimeout(() => {
        h1.innerText = `You mashed ${score} times!`;
        p.innerText = "click start to try for a better score!";
        start.id = "";
      }, 5000)
    }, 1500)
})

function countdown() {
      start.id = "mash-hide";
        setTimeout(() => {
            setTimeout(() => {
                setTimeout(() => {
                    h1.innerText = "GO GO GO!!";
                },500)
                h1.innerText = "1";
            },500)
            h1.innerText = "2";
        },500)
        h1.innerText = "3";
}

function aKeyPress() {
    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "KeyA"
        ) {
          score += 1;
          console.log(score)
        }
      }
}

