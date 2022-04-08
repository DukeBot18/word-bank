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
            tempElement.innerHTML += `<span class="answer">${words[i][j]}</span>`;
        }
        if (i != words.length - 1) {
            tempElement.innerHTML += '<span class="answer blank"> </span>';
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