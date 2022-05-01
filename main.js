// Phrase data and generation function
import { phraseObject } from "./phrases.js";
import { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, purchases, removeAlert, letterGuessDelete, insertPhrase, categoryDiv, hintElement, guessArr, currentMoney, userGuessBtn, lettersArr, enterLetter } from "./functions.js";

/*
    ===================================
    GENERATED CONTENT FROM DAILY PHRASE 
    ===================================
*/

// add starting bankroll
currentMoney.innerHTML = "$ " + money;

// setup initial puzzle
resetPuzzle( Object.values(phraseObject), insertPhrase, categoryDiv, hintElement, guessArr, currentMoney);

// Reset puzzle once per day
let dayInMilliseconds = 80000;
setInterval(resetPuzzle, dayInMilliseconds, Object.values(phraseObject), insertPhrase,
categoryDiv, hintElement, guessArr, currentMoney, userGuessBtn, lettersArr);


/*
    =================
    USER INPUT ROUTES
    =================
*/

// click enter btn
let enterBtn = document.querySelector(".enter");
enterBtn.addEventListener("click", enterLetter);

// various key events
document.addEventListener("keydown", function (event) {
    event.preventDefault();
    if (event.key == "Enter") {
        enterLetter();
    }
    else if (event.key == "Backspace") {
        letterGuessDelete("delete");
    }
    else {
        let letter = event.key;
        if (/^[a-z]$/i.test(letter)) {
            letterGuessDelete("letter", "keyboard", letter);
        }
    }
});

// guess mode toggle
userGuessBtn.addEventListener("click", function() {
    letterGuessDelete("guess");
});

for (let element of lettersArr) {
    element.addEventListener("click", function() {
        letterGuessDelete("letter", element);
    });
}

// deleting letters in guess mode
let deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", function() {
    letterGuessDelete("delete");
});

/*
    =========================
    HINT AND SETTINGS BUTTONS
    =========================
*/
let hintBtn = document.querySelector(".hint-btn");
hintBtn.addEventListener("click", function() {
    if (guessCount < guessArr.length) {
        // exit if hint provided
        if (hintElement.classList.contains("visible")){
            return;
        }
        // make visible
        hintElement.classList.add("visible");
        // add purchase
        purchases(guessArr, "+", 150, "hint-guess");
        // update guess and money
        guessAmount();
        dollarAmount(currentMoney, 150) 
    }
})

// toggle dark and light mode
let toggleTheme = document.querySelector(".theme-btn");

let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme)
    if (storedTheme === "light") {
        document.querySelector(".moon").style.display = "none";
        document.querySelector(".sun").style.display = "inline-block";
    }
}

toggleTheme.onclick = function() {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
        document.querySelector(".moon").style.display = "inline-block";
        document.querySelector(".sun").style.display = "none";
    }
    else {
        document.querySelector(".moon").style.display = "none";
        document.querySelector(".sun").style.display = "inline-block";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
};

// toggle how to play
let toggleHowToPlay = document.querySelector(".how-to-play-btn");

toggleHowToPlay.onclick = function() {
    document.querySelector(".overlay").classList.toggle("game-play");
    setTimeout(function() {
        document.querySelector(".overlay").classList.toggle("fade");
    }, 20);
    setTimeout(function() {
        document.querySelector(".overlay-content").classList.toggle("translate");
    }, 10);
}

let closeHowToPlay = document.querySelector(".close-settings");

closeHowToPlay.onclick = function() {
    document.querySelector(".overlay").classList.toggle("fade");
    document.querySelector(".overlay").classList.toggle("game-play");
    document.querySelector(".overlay-content").classList.toggle("translate");

}

// toggle game-stats popup
let toggleGameStats = document.querySelector(".close-stats");

toggleGameStats.onclick = function() {
    document.querySelector(".overlay-game-win").classList.toggle("game-play");
    document.querySelector(".overlay-game-win").classList.toggle("fade");
    document.querySelector(".game-stats-overlay").classList.toggle("translate");
}
