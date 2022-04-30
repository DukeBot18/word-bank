// Phrase data and generation function
import { phraseObject } from "./phrases.js";
import { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, purchases, removeAlert, letterGuessDelete, insertPhrase, categoryDiv, hintElement, guessArr, currentMoney, userGuessBtn, lettersArr } from "./functions.js";

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
let dayInMilliseconds = 8000;
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
    =============================
    ENTERING USER INPUT INTO GAME
    =============================
*/
    
function enterLetter() {
    // || NON GUESS MODE || \\
    if (!userGuessBtn.classList.contains("guess-mode")) {
        // get highlighted letter
        let letter = document.querySelector(".highlight");
        if (letter === null) {
            return;
        }
        
        // get value of letter and cost
        let tempArr = letter.textContent.split("$");
        
        // see if guess was correct
        let result = correctLetter(tempArr[0]);

        // add purchase
        if (guessCount < guessArr.length) {
            if(result) {
                purchases(guessArr, tempArr[0], tempArr[1], "correct-guess");
            }
            else {
                purchases(guessArr, tempArr[0], tempArr[1], "incorrect-guess");
            }
            guessAmount();
        }

        // subtrack letter cost from current money
        dollarAmount(currentMoney, tempArr[1]);

        // add letters in hidden phrase if correct
        if (result) {
            // highlight letter as correct
            letter.classList.remove("highlight");
            letter.classList.add("correct");

            // make visible correct letters in phrase
            let answerArr = [...document.querySelectorAll(".answer")];

            for (let i = 0; i < answerArr.length; i++) {
                if (answerArr[i].textContent == tempArr[0]) {

                    // Remove class to make letter visible
                    answerArr[i].parentNode.classList.add("correct-letter-fade")
                    answerArr[i].classList.remove("non-visible");
                }
            }
        }
        else {
            // highlight letter as incorrect
            letter.classList.remove("highlight");
            letter.classList.add("incorrect");
        }
    }
    // || GUESS MODE ACTIVE || \\
    else {
        // check to make sure all phrase boxes filled
        for(let i = 0; i < phraseLettersArr.length; i++) {
            if (phraseLettersArr[i].firstElementChild.classList.contains("non-visible")) {
                if(!phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                    let alert = document.querySelector(".alert-div");
                    alert.innerHTML = "Please enter input for all boxes before entering";
                    setTimeout(removeAlert, 2500, alert);
                    return;
                }
            }  
        }

        // if all boxes filled check against answer
        for (let i = 0; i < phraseLettersArr.length; i++) {
            if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                if (phraseLettersArr[i].lastElementChild.innerHTML == phraseLettersArr[i].firstElementChild.innerHTML) {
                    phraseLettersArr[i].classList.add("correct-letter-fade");
                    phraseLettersArr[i].firstElementChild.classList.remove("non-visible");
                }
                // remove the guessed letters
                phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
                if (phraseLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                    phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
                }
            }
        }

        // add back guess-highlight to first available
        for (let first of phraseLettersArr) {
            if (first.firstElementChild.classList.contains("non-visible")) {
                first.classList.add("guess-mode-current-guess-box");
                break;
            }
        }

        // subtrack money from total for guess
        let guessSubtract = Math.round(Math.ceil((money * 0.15) * 100) / 100);
        dollarAmount(currentMoney, guessSubtract);

        // add purchase
        if (guessCount < guessArr.length) {
            purchases(guessArr, "?", guessSubtract, "guess-guess");
            guessAmount();
        }
    }

}

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
}

let closeHowToPlay = document.querySelector(".close-settings");

closeHowToPlay.onclick = function() {
    document.querySelector(".overlay").classList.toggle("game-play");
}
