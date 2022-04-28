// Phrase data and generation function
import { phraseObject } from "./phrases.js";
import { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, purchases, removeAlert, checkHighlight } from "./functions.js";

/*
    ===================================
    GENERATED CONTENT FROM DAILY PHRASE 
    ===================================
*/

// content reset elements
let insertPhrase = document.querySelector(".phrase-container");
let categoryDiv = document.querySelector(".category");
let hintElement = document.querySelector(".hint");
let guessArr = [...document.querySelectorAll(".guess-box")];
let currentMoney = document.querySelector("#bankroll");
let userGuessBtn = document.querySelector(".make-guess-btn");
const lettersArr = [...document.querySelectorAll(".letter")];

// add starting bankroll
currentMoney.innerHTML = "$ " + money;

// setup initial puzzle
resetPuzzle( Object.values(phraseObject), insertPhrase, categoryDiv, hintElement, guessArr, currentMoney);

// Reset puzzle once per day
let dayInMilliseconds = 100000;
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

// || ADDING LETTERS TO HIDDEN BOXES || \\
function letterGuessDelete(...args) {

    // GUESS MODE ACTIVE
    if (userGuessBtn.classList.contains("guess-mode")) {

        // if delete button clicked
        if (args[0] == "delete") {
            for (let i = phraseLettersArr.length - 1; i > 0; i--) {

                if (phraseLettersArr[i].classList.contains("guess-mode-current-guess-box")) {

                    // if last element, keep guess mode highlight
                    for(let j = i; j < phraseLettersArr.length; j++) {
                        if(phraseLettersArr[j+1] == undefined && phraseLettersArr[j].lastElementChild.classList.contains("added-guess-input")|| phraseLettersArr[j+1] != undefined && phraseLettersArr[j].lastElementChild.classList.contains("added-guess-input")) {
                            phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
                            return;
                        }
                        if(phraseLettersArr[j+1] == undefined && !phraseLettersArr[j].lastElementChild.classList.contains("added-guess-input")) {
                            phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            break;
                        }
                        else {
                            phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            break;
                        }
                    }

                    let counter = 1;
                    while (phraseLettersArr[i-counter] != undefined) {
                        if (phraseLettersArr[i-counter].firstElementChild.classList.contains("non-visible")) {
                            phraseLettersArr[i-counter].classList.add("guess-mode-current-guess-box");
                            phraseLettersArr[i-counter].removeChild(phraseLettersArr[i-counter].lastElementChild);
                            return
                        }
                        else {
                            counter++;
                        }
                    } 
                }
            }
        }

        // exit guess mode
        if (args[0] == "guess") {
            userGuessBtn.classList.remove("guess-mode");
            userGuessBtn.classList.remove("guess-highlight");

            // remove current guesses
            for(let i = 0; i < phraseLettersArr.length; i++) {
                if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                    phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
                }
                // remove highlighted box
                if (phraseLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                    phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
                }
                
            }

            return;
        }
        else if (args[0] == "letter") {
            for(let i = 0; i < phraseLettersArr.length; i++) {
                if (phraseLettersArr[i].firstElementChild.classList.contains("non-visible") && !phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {

                    // if keyboard input
                    if (args[1] == "keyboard") {
                        phraseLettersArr[i].innerHTML += `<i class="added-guess-input">${args[2]}</i>`;
                    }
                     // mouse click addition
                    else {
                        let tempArr = args[1].textContent.split("$");
                        phraseLettersArr[i].innerHTML += `<i class="added-guess-input">${tempArr[0]}</i>`;
                    }
                    // remove highlight from box unless last viable box
                    let tempCount = 1
                    while(phraseLettersArr[i+tempCount] != undefined) {
                        if (phraseLettersArr[i+tempCount].firstElementChild.classList.contains("non-visible")) {
                            phraseLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            phraseLettersArr[i+tempCount].classList.add("guess-mode-current-guess-box");
                            break;
                        }
                        else {
                            tempCount++;
                        }
                    }
                    
                    return;
                }
            }
        }
    }

    // GUESS MODE INACTIVE
    else {
        // if guess btn pressed turn guess mode on
        if (args[0] == "guess") {
            // remove any highlighted letters
            for (let i = 0; i < lettersArr.length; i++) {
                if (lettersArr[i].classList.contains("highlight")) {
                    lettersArr[i].classList.remove("highlight");
                }
            }
            userGuessBtn.classList.add("guess-mode");
            userGuessBtn.classList.add("guess-highlight");

            // add phrase box highlight
            for(let i = 0; i < phraseLettersArr.length; i++) {
                if (phraseLettersArr[i].firstElementChild.classList.contains("non-visible") && !phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {

                    phraseLettersArr[i].classList.add("guess-mode-current-guess-box")
                    return;
                }
            }          

            return;
        }
        // else regular guess with letter
        else {
            if (args[1] == "keyboard") {
                for(let i = 0; i <lettersArr.length; i++) {
                    if (lettersArr[i].textContent[0] == args[2].toLowerCase()) {
                        if (lettersArr[i].classList.contains("incorrect") || lettersArr[i].classList.contains("correct")) {
                            return;
                        }
                        checkHighlight(lettersArr);
                        lettersArr[i].classList.add("highlight");
                    }
                }
            }
            else {
                if (args[1].classList.contains("incorrect") || args[1].classList.contains("correct"))
                {
                    return;
                }
                checkHighlight(lettersArr);
                args[1].classList.add("highlight");
            }
        }
    }
}


/*
    ===========
    HINT BUTTON
    ===========
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