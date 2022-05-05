// Phrase data and generation function
import { phraseObject } from "./phrases.js";
import { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, removeAlert, letterGuessDelete, insertPhrase, categoryDiv, hintElement, currentMoney, userGuessBtn, lettersArr, enterLetter, checkHighlight, potentialPurchase, addGuessBtn, hintBtn, deleteBtn, enterBtn } from "./functions.js";

/*=================================
GENERATED CONTENT FROM DAILY PHRASE 
=================================*/

// add starting bankroll
currentMoney.innerHTML = "$ " + money;

// setup initial puzzle
resetPuzzle(Object.values(phraseObject), insertPhrase, categoryDiv, hintElement, currentMoney);

// Reset puzzle once per day
let dayInMilliseconds = 800000;
setInterval(resetPuzzle, dayInMilliseconds, Object.values(phraseObject), insertPhrase, categoryDiv, hintElement, currentMoney, userGuessBtn, lettersArr);


/*===============
USER INPUT ROUTES
===============*/

// click enter btn
enterBtn.addEventListener("click", enterLetter);

// various key events
document.addEventListener("keydown", function (event) {
    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        hintBtn.classList.remove("hint-focus");
        potentialPurchase.innerHTML = "";
    }
    // remove add guess possibility
    if(addGuessBtn.classList.contains("guess-focus-default") || addGuessBtn.classList.contains("guess-focus-one") || addGuessBtn.classList.contains("guess-focus-zero")) {
        addGuessBtn.classList.remove("guess-focus-default");
        addGuessBtn.classList.remove("guess-focus-one");
        addGuessBtn.classList.remove("guess-focus-zero");
        potentialPurchase.innerHTML = "";
    }

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
    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        hintBtn.classList.remove("hint-focus");
        potentialPurchase.innerHTML = "";
    }
    // remove add guess possibility
    if(addGuessBtn.classList.contains("guess-focus-default") || addGuessBtn.classList.contains("guess-focus-one") || addGuessBtn.classList.contains("guess-focus-zero")) {
        addGuessBtn.classList.remove("guess-focus-default");
        addGuessBtn.classList.remove("guess-focus-one");
        addGuessBtn.classList.remove("guess-focus-zero");
        potentialPurchase.innerHTML = "";
    }   
    letterGuessDelete("guess");
});

// adding letters with click
for (let element of lettersArr) {
    element.addEventListener("click", function() {
        // remove hint possiblity
        if(!hintElement.classList.contains("visible")) {
            hintBtn.classList.remove("hint-focus");
            potentialPurchase.innerHTML = "";
        }
        // remove add guess possibility
        if(addGuessBtn.classList.contains("guess-focus-default") || addGuessBtn.classList.contains("guess-focus-one") || addGuessBtn.classList.contains("guess-focus-zero")) {
            addGuessBtn.classList.remove("guess-focus-default");
            addGuessBtn.classList.remove("guess-focus-one");
            addGuessBtn.classList.remove("guess-focus-zero");
            potentialPurchase.innerHTML = "";
        }               
        letterGuessDelete("letter", element);
    });
}

// deleting letters in guess mode
deleteBtn.addEventListener("click", function() {
    letterGuessDelete("delete");
});

/*===========================
ADDITONAL GUESS FUNCTIONALITY
===========================*/
addGuessBtn.addEventListener("click", function() {
    if(userGuessBtn.classList.contains("guess-mode")){
        // remove current guesses
        userGuessBtn.classList.remove("guess-mode");
        userGuessBtn.classList.remove("guess-highlight");
        for(let i = 0; i < phraseLettersArr.length; i++) {
            if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
            }
            // remove highlighted box
            if (phraseLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
            }            
        }        
    }
    // remove highlights from other entry possibilities
    checkHighlight(lettersArr);

    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        hintBtn.classList.remove("hint-focus");
        potentialPurchase.innerHTML = "";
    }

    if (guessCount >= 2) {
        addGuessBtn.classList.toggle("guess-focus-default"); 
    }
    else if (guessCount === 1) {
        addGuessBtn.classList.toggle("guess-focus-one");
    }
    else if (guessCount === 0) {
        addGuessBtn.classList.toggle("guess-focus-zero");
    }

    if(addGuessBtn.classList.contains("guess-focus-default") || addGuessBtn.classList.contains("guess-focus-one") || addGuessBtn.classList.contains("guess-focus-zero")) {
        potentialPurchase.innerHTML = "-150";
    }
    else {
        potentialPurchase.innerHTML = "";
    }

});

/*===========================
HINT SETTINGS BUTTONS & STATS
===========================*/
hintBtn.addEventListener("click", function() { 
    // exit if hint provided
    if (hintElement.classList.contains("visible")){
        return;
    }
    if(userGuessBtn.classList.contains("guess-mode")){
        // remove current guesses
        userGuessBtn.classList.remove("guess-mode");
        userGuessBtn.classList.remove("guess-highlight");
        for(let i = 0; i < phraseLettersArr.length; i++) {
            if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
            }
            // remove highlighted box
            if (phraseLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
            }            
        }        
    }
    // remove add guess possibility
    if(addGuessBtn.classList.contains("guess-focus-default") || addGuessBtn.classList.contains("guess-focus-one") || addGuessBtn.classList.contains("guess-focus-zero")) {
        addGuessBtn.classList.remove("guess-focus-default");
        addGuessBtn.classList.remove("guess-focus-one");
        addGuessBtn.classList.remove("guess-focus-zero");
        potentialPurchase.innerHTML = "";
    }    
    // remove highlights from other entry possibilities
    checkHighlight(lettersArr);
    hintBtn.classList.toggle("hint-focus");
    if (hintBtn.classList.contains("hint-focus")) {
        potentialPurchase.innerHTML = "-150";
    }
    else {
        potentialPurchase.innerHTML = "";
    }
    // make visible
});

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
