let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");
const kp = document.querySelectorAll(".input")
let userInput = ""

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");
    guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus;
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        const isInPlace = WORD_LETTERS[index] === letter;
        if (isInPlace) {
            letterStatus = 2;
        } else if (existsInWord) {
            letterStatus = 1;
        } else {
            letterStatus = 0;
        }
        status.push(letterStatus);
    })
    printGuess(guess, status);
    return status;
}

el.focus();

el.addEventListener("blur", function(e) {
    el.focus();
})

document.addEventListener("focus", function(e) {
    el.focus();
})

el.addEventListener("change", function(e) {
    userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
        e.target.value = "";
        const event = new Event('input');
        e.target.dispatchEvent(event);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
    } else {
        console.log("Skip this");
    }
});

for(let i=0; i < kp.length; i++){
    kp[i].addEventListener("click",function(e){
        userInput += e.target.value
        drawGhostInput(userInput);
        if (userInput.length === 5) {
            const result = registerGuess(userInput);
            e.target.value = "";
            const event = new Event('input');
            e.target.dispatchEvent(event);
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            if (result.reduce(reducer) === 10) {
                el.classList.add("hidden");
                const victoryMessage = document.createElement("div");
                victoryMessage.innerText = "You won";
                document.body.appendChild(victoryMessage);
            }
            userInput = ""
            drawGhostInput(userInput)
        } else {
            console.log("Skip this");
        }
    })
}

el.addEventListener("input", function(e) {
    userInput = e.target.value;
    drawGhostInput(userInput);
});
