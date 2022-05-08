// Phrase data and generation function
import { phraseObject } from "./phrases.js";
import { resetPuzzle, startingGuessCount, guessAmount, money, dollarAmount, correctLetter, puzzleAnswerLettersArr, removeAlert, letterGuessDelete, puzzleElement, categoryElement, hintElement, bankrollElement, makeAGuessBtn, keyboardLettersArr, enterLetter, checkHighlight, potentialPurchaseElement, increaseCurrentGuessesBtn, revealHintBtn, backspaceBtn, enterBtn, checkPotentialPurchase } from "./functions.js";

/*=================================
GENERATED CONTENT FROM DAILY PHRASE 
=================================*/

// add starting bankroll
bankrollElement.innerHTML = "$ " + money;

// setup initial puzzle
resetPuzzle(Object.values(phraseObject), puzzleElement, categoryElement, hintElement, bankrollElement);

let today = new Date();
console.log(today);
console.log(Date.now());

// Reset puzzle once per day
let dayInMilliseconds = 800000;
setInterval(resetPuzzle, dayInMilliseconds, Object.values(phraseObject), puzzleElement, categoryElement, hintElement, bankrollElement, makeAGuessBtn, keyboardLettersArr);


/*===============
USER INPUT ROUTES
===============*/

// click enter btn
enterBtn.addEventListener("click", enterLetter);

// various key events
document.addEventListener("keydown", function (event) {
    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        revealHintBtn.classList.remove("hint-focus");
        potentialPurchaseElement.innerHTML = "";
    }
    // remove add guess possibility
    if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
        increaseCurrentGuessesBtn.classList.remove("guess-focus-default");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-one");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-zero");
        potentialPurchaseElement.innerHTML = "";
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
makeAGuessBtn.addEventListener("click", function() {
    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        revealHintBtn.classList.remove("hint-focus");
        potentialPurchaseElement.innerHTML = "";
    }
    // remove add guess possibility
    if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
        increaseCurrentGuessesBtn.classList.remove("guess-focus-default");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-one");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-zero");
        potentialPurchaseElement.innerHTML = "";
    }   
    letterGuessDelete("guess");
});

// adding letters with click
for (let element of keyboardLettersArr) {
    element.addEventListener("click", function() {
        // remove hint possiblity
        if(!hintElement.classList.contains("visible")) {
            revealHintBtn.classList.remove("hint-focus");
            potentialPurchaseElement.innerHTML = "";
        }
        // remove add guess possibility
        if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
            increaseCurrentGuessesBtn.classList.remove("guess-focus-default");
            increaseCurrentGuessesBtn.classList.remove("guess-focus-one");
            increaseCurrentGuessesBtn.classList.remove("guess-focus-zero");
            potentialPurchaseElement.innerHTML = "";
        }         
        letterGuessDelete("letter", element);
    });
}

// deleting letters in guess mode
backspaceBtn.addEventListener("click", function() {
    letterGuessDelete("delete");
});

/*===========================
ADDITONAL GUESS FUNCTIONALITY
===========================*/
increaseCurrentGuessesBtn.addEventListener("click", function() {
    if(makeAGuessBtn.classList.contains("guess-mode")){
        // remove current guesses
        makeAGuessBtn.classList.remove("guess-mode");
        makeAGuessBtn.classList.remove("guess-highlight");
        for(let i = 0; i < puzzleAnswerLettersArr.length; i++) {
            if (puzzleAnswerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                puzzleAnswerLettersArr[i].removeChild(puzzleAnswerLettersArr[i].lastElementChild);
            }
            // remove highlighted box
            if (puzzleAnswerLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                puzzleAnswerLettersArr[i].classList.remove("guess-mode-current-guess-box");
            }            
        }        
    }
    // remove highlights from other entry possibilities
    checkHighlight(keyboardLettersArr);

    // remove hint possiblity
    if(!hintElement.classList.contains("visible")) {
        revealHintBtn.classList.remove("hint-focus");
        potentialPurchaseElement.innerHTML = "";
    }

    if (startingGuessCount >= 2) {
        increaseCurrentGuessesBtn.classList.toggle("guess-focus-default"); 
    }
    else if (startingGuessCount === 1) {
        increaseCurrentGuessesBtn.classList.toggle("guess-focus-one");
    }
    else if (startingGuessCount === 0) {
        increaseCurrentGuessesBtn.classList.toggle("guess-focus-zero");
    }

    if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
        potentialPurchaseElement.innerHTML = "-150";
    }
    else {
        potentialPurchaseElement.innerHTML = "";
    }

});

/*===========================
HINT SETTINGS BUTTONS & STATS
===========================*/
revealHintBtn.addEventListener("click", function() { 
    // exit if hint provided
    if (hintElement.classList.contains("visible")){
        return;
    }
    if(makeAGuessBtn.classList.contains("guess-mode")){
        // remove current guesses
        makeAGuessBtn.classList.remove("guess-mode");
        makeAGuessBtn.classList.remove("guess-highlight");
        for(let i = 0; i < puzzleAnswerLettersArr.length; i++) {
            if (puzzleAnswerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                puzzleAnswerLettersArr[i].removeChild(puzzleAnswerLettersArr[i].lastElementChild);
            }
            // remove highlighted box
            if (puzzleAnswerLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                puzzleAnswerLettersArr[i].classList.remove("guess-mode-current-guess-box");
            }            
        }        
    }
    // remove add guess possibility
    if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
        increaseCurrentGuessesBtn.classList.remove("guess-focus-default");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-one");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-zero");
        potentialPurchaseElement.innerHTML = "";
    }    
    // remove highlights from other entry possibilities
    checkHighlight(keyboardLettersArr);
    revealHintBtn.classList.toggle("hint-focus");
    checkPotentialPurchase(150);
    if (revealHintBtn.classList.contains("hint-focus")) {
        potentialPurchaseElement.innerHTML = "-150";
    }
    else {
        potentialPurchaseElement.innerHTML = "";
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
