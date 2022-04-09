// Import phrase data
import { phraseObject } from "./phrases.js";

// || Generated content from Phrase data || //

// Generate phrase for the day
const values = Object.values(phraseObject);

// Randomly choose one phrase
let phrase = values[Math.floor(Math.random() * values.length)];
console.log(phrase);
console.log(phrase["category"]);

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
                tempElement.innerHTML += `<div contenteditable="true" class="letter-box"><span class="answer non-visible">${words[i][j]}</span></div>`;
            }
        }
        if (i != words.length - 1) {
            tempElement.innerHTML += '<div class="letter-box blank"><span class=" blank"> </span></div>';
        }
    }


// || Bankroll and Guesses || //

// Initial bankroll
let money = 1000;
let currentMoney = document.querySelector("#bankroll");

currentMoney.innerHTML = "$ " + money;

// Initial guesses
let guessCount = 0;

// Guess Boxes
let guessArr = [...document.querySelectorAll(".guess-box")];

// Letter Boxes
const lettersArr = [...document.querySelectorAll(".letter")];

for (let element of lettersArr) {
    element.addEventListener("click", function() {

        // if letter already chosen exit
        if (element.classList.contains("incorrect") || element.classList.contains("correct"))
        {
            return;
        }

        // check if other letters are highlighted without entering
        for (let i = 0; i < lettersArr.length; i++) {
            if (lettersArr[i].classList.contains("highlight")) {
                lettersArr[i].classList.remove("highlight");
            }
        }

        element.classList.add("highlight");
    });
}

// Check for enter button click and highlighted letter
let enterBtn = document.querySelector(".enter");

enterBtn.addEventListener("click", function() {
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
});

// add hint 
let hint = phrase["hint"];

let hintBtn = document.querySelector(".hint-btn");

// only allow one hint
let hintCount = 0;

hintBtn.addEventListener("click", function() {
    if(guessCount < guessArr.length) {
        if (hintCount == 0) {
            let element = document.querySelector("#hint");
            element.innerHTML = `<span>HINT: </span>${hint}`;
    
            // add hint to guessbox
            guessArr[guessCount].firstElementChild.innerHTML = "h";
            guessArr[guessCount].firstElementChild.classList.add("hint-guess");
            guessArr[guessCount].lastElementChild.innerHTML = "-$100";
            guessArr[guessCount].lastElementChild.classList.add("hint-guess");
            guessCount++;
            hintCount++;
    
            // subtrack money 
            money -= 100;
            currentMoney.innerHTML = "$ " + money;
        }
    }
})
