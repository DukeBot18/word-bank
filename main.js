// Import phrase data
import { phraseObject } from "./phrases.js";

// || Generated content from Phrase data || //

// Generate phrase for the day
const values = Object.values(phraseObject);

// Randomly choose one phrase
let phrase = values[Math.floor(Math.random() * values.length)];

// get all words in phrase in an array 
let words = phrase["phrase"].split(" ");

// element to insert phrase
let insertPhrase = document.querySelector(".phrase-container");


// for (let i = 0; i < words; i++) {
    for(let i = 0; i < words.length; i++) {
        insertPhrase.innerHTML += `<div class="word-phrases" id="word-phrase-${i}"></div>`;
        let tempElement = document.getElementById(`word-phrase-${i}`);
        for(let j = 0; j < words[i].length; j++) {
            tempElement.innerHTML += `<div contenteditable="true" class="letter-box"><span class="answer non-visible">${words[i][j]}</span></div>`;
        }
        if (i != words.length - 1) {
            tempElement.innerHTML += '<div class="letter-box blank"><span class=" blank"> </span></div>';
        }
    }

// add hint 
let hint = phrase["hint"];

let hintBtn = document.querySelector(".hint-btn");

hintBtn.addEventListener("click", function() {
    let element = document.querySelector("#hint");
    element.innerHTML = hint;
})

// || Bankroll Manipulation || //

// Bankroll
let money = 1000;
let currentMoney = document.querySelector("#bankroll");

currentMoney.innerHTML = "$ " + money;

// Guesses
let allGuessBxs = document.querySelectorAll(".guess-box");
console.log(allGuessBxs);

// Letters 
const lettersArr = [...document.querySelectorAll(".letter")];
console.log(lettersArr);

for (let element of lettersArr) {
    element.addEventListener("click", function() {
        console.log(element.textContent);

        element.classList.add("highlight");

        // enter element for next click even Need a PROMISE
        let enterElm = document.querySelector(".enter");
        console.log(enterElm);
        if(enterElm.clicked == true) {
            console.log("TRUE");
        }
        // TODO: above
        
        // Get letter and subsequent dollar value
        let tempArr = element.textContent.split("$");

        // Subtrack from available money
        money -= tempArr[1];
        currentMoney.innerHTML = "$ " + money;

        // Add letters in hidden phrase if guessed correct
        if (phrase["phrase"].includes(tempArr[0])) {

            // Change letter color if its in phrase
            element.classList.remove("highlight");
            element.classList.add("correct")
    
            let answerArr = [...document.querySelectorAll(".answer")];

            for (let i = 0; i < answerArr.length; i++){
                if (answerArr[i].textContent == tempArr[0]) {
                    // Remove class to make Letter visible
                    answerArr[i].classList.remove("non-visible");
                }
            }
        }
        else {
            element.classList.remove("highlight");
            element.classList.add("incorrect");
        }
    })
}