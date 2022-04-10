// Import phrase data
import { phraseObject } from "./phrases.js";


// || GENERATED CONTENT FROM DAILY PHRASE || \\

// Generate phrase for the day
const values = Object.values(phraseObject);

// Randomly choose one phrase
let phrase = values[Math.floor(Math.random() * values.length)];

// add category 
let categoryDiv = document.querySelector(".category");
categoryDiv.innerHTML = phrase["category"];

// get all words in phrase in an array 
let words = phrase["phrase"].split(" ");

// element to insert phrase
let insertPhrase = document.querySelector(".phrase-container");

    // Dynamically create phrase boxes
    for(let i = 0; i < words.length; i++) {
        insertPhrase.innerHTML += `<div class="word-phrases" id="word-phrase-${i}"></div>`;
        let tempElement = document.getElementById(`word-phrase-${i}`);
        for(let j = 0; j < words[i].length; j++) {

            // make apostrophe's visible
            let apostropheRegex = /'/;
            if (apostropheRegex.test(words[i][j])) {
                tempElement.innerHTML += `<div class="letter-box"><span class="answer">${words[i][j]}</span></div>`;
            }
            // all other letters hidden
            else {
                tempElement.innerHTML += `<div class="letter-box"><span class="answer non-visible">${words[i][j]}</span></div>`;
            }
        }
        if (i != words.length - 1) {
            tempElement.innerHTML += '<div class="blank-box blank"><span class=" blank"> </span></div>';
        }
    }


// || BANKROLL AND GUESSES || \\

// Initial bankroll
let money = 1000;
let currentMoney = document.querySelector("#bankroll");

currentMoney.innerHTML = "$ " + money;

// Initial guesses
let guessCount = 0;

// Guess Boxes
let guessArr = [...document.querySelectorAll(".guess-box")];


// || ENTERING USER INPUT || \\

let enterBtn = document.querySelector(".enter");

// two events to enter letter
enterBtn.addEventListener("click", enterLetter);
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        enterLetter();
    }
});

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
        let result = phrase["phrase"].includes(tempArr[0]);

        // add guess to guess box
        if (guessCount < guessArr.length) {
            if(result) {
                guessArr[guessCount].firstElementChild.innerHTML = tempArr[0];
                guessArr[guessCount].firstElementChild.classList.add("correct-guess");
                guessArr[guessCount].lastElementChild.innerHTML = `-$${tempArr[1]}`;
                guessArr[guessCount].lastElementChild.classList.add("correct-guess");
            }
            else {
                guessArr[guessCount].firstElementChild.innerHTML = tempArr[0];
                guessArr[guessCount].firstElementChild.classList.add("incorrect-guess");
                guessArr[guessCount].lastElementChild.innerHTML = `-$${tempArr[1]}`;
                guessArr[guessCount].lastElementChild.classList.add("incorrect-guess");
            }
            guessCount++;
        }

        // subtrack letter cost from current money
        money -= tempArr[1];
        currentMoney.innerHTML = "$ " + money;

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
                    setTimeout(removeElement, 2500);
                    return;
                }
            }  
        }

        // if all boxes filled check against answer
        for (let i = 0; i < phraseLettersArr.length; i++) {
            if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                if (phraseLettersArr[i].lastElementChild.innerHTML == phraseLettersArr[i].firstElementChild.innerHTML) {
                    phraseLettersArr[i].firstElementChild.classList.remove("non-visible");
                }
                // remove the guessed letters
                phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
            }
        }

        // subtrack money from total for guess
        money -= 150;
        currentMoney.innerHTML = "$ " + money;

        // add guess to guessbox
        if (guessCount < guessArr.length) {

            guessArr[guessCount].firstElementChild.innerHTML = "g";
            guessArr[guessCount].firstElementChild.classList.add("guess-guess");
            guessArr[guessCount].lastElementChild.innerHTML = "-$150";
            guessArr[guessCount].lastElementChild.classList.add("guess-guess");
            guessCount++;
        }
    }

}


// || HINT BUTTON || \\

let hint = phrase["hint"];

let hintBtn = document.querySelector(".hint-btn");

// only allow one hint
let hintCount = 0;

hintBtn.addEventListener("click", function() {
    if (guessCount < guessArr.length) {
        if (hintCount == 0) {
            let element = document.querySelector("#hint");
            element.innerHTML = `<span>HINT: </span>${hint}`;
    
            // add hint to guessbox
            guessArr[guessCount].firstElementChild.innerHTML = "h";
            guessArr[guessCount].firstElementChild.classList.add("hint-guess");
            guessArr[guessCount].lastElementChild.innerHTML = "-$150";
            guessArr[guessCount].lastElementChild.classList.add("hint-guess");
            guessCount++;
            hintCount++;
    
            // subtrack money 
            money -= 150;
            currentMoney.innerHTML = "$ " + money;
        }
    }
})


// || ROUTES TO ADDING LETTERS || \\

// using guess input
let userGuessBtn = document.querySelector(".make-guess-btn");
userGuessBtn.addEventListener("click", function() {
    letterOrGuess("guess");
});

// using letter input
const lettersArr = [...document.querySelectorAll(".letter")];

for (let element of lettersArr) {
    element.addEventListener("click", function() {
        letterOrGuess("letter", element);
    });
}
    

// || ADDING LETTERS TO HIDDEN BOXES || \\

// get amount of letters
let phraseLettersArr = [...document.querySelectorAll(".letter-box")];

function letterOrGuess(...args) {
    console.log(args);

    // GUESS MODE ACTIVE
    if (userGuessBtn.classList.contains("guess-mode")) {

        // exit guess mode
        if (args.length == 1) {
            userGuessBtn.classList.remove("guess-mode");
            userGuessBtn.classList.remove("guess-highlight");

            // remove current guesses
            for(let i = 0; i < phraseLettersArr.length; i++) {
                if (phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                    phraseLettersArr[i].removeChild(phraseLettersArr[i].lastElementChild);
                }
            }
            return;
        }
        else {
            for(let i = 0; i < phraseLettersArr.length; i++) {
                if (phraseLettersArr[i].firstElementChild.classList.contains("non-visible") && !phraseLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {

                    // add guess letter into box
                    let tempArr = args[1].textContent.split("$");
                    phraseLettersArr[i].innerHTML += `<i class="added-guess-input">${tempArr[0]}</i>`;
                    return;
                }
            }
        }
    }

    // GUESS MODE INACTIVE
    else {
        // if guess btn pressed turn guess mode on
        if (args.length == 1) {
            // remove any highlighted letters
            for (let i = 0; i < lettersArr.length; i++) {
                if (lettersArr[i].classList.contains("highlight")) {
                    lettersArr[i].classList.remove("highlight");
                }
            }            
            userGuessBtn.classList.add("guess-mode");
            userGuessBtn.classList.add("guess-highlight");
            return;
        }
        // else regular guess with letter
        else {
            // if letter already chosen exit
            if (args[1].classList.contains("incorrect") || args[1].classList.contains("correct"))
            {
                return;
            }

            // check if other letters are highlighted without entering
            for (let i = 0; i < lettersArr.length; i++) {
                if (lettersArr[i].classList.contains("highlight")) {
                    lettersArr[i].classList.remove("highlight");
                }
            }

            args[1].classList.add("highlight");
        }
    }
}


// || ALERT FUNCTION || \\
function removeElement() {
    let alertDiv = document.querySelector(".alert-div");
    alertDiv.innerHTML = "";
}