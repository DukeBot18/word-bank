// Import phrase data
import { phraseObject } from "./phrases.js";

// Generate phrase for the day
const values = Object.values(phraseObject);
console.log(values);

let phrase = values[Math.floor(Math.random() * values.length)];
console.log(phrase);

// length of all characters in phrase
let answerLength = phrase["phrase"].length;
console.log(phrase["phrase"]);
console.log(answerLength);

// amount of words in phrase
let words = phrase["phrase"].match(/\s/g).length + 1;
console.log(words);

// element to insert phrase
let insertPhrase = document.querySelector(".phrase-container");
console.log(insertPhrase);

// for (let i = 0; i < words; i++) {
    for( let i = 0; i < answerLength; i++) {
    insertPhrase.innerHTML += `<span class="answer">${phrase["phrase"][i]}</span>`;
    }

// Bankroll
let money = 1000;
let currentMoney = document.querySelector("#bankroll");

currentMoney.innerHTML = "$ " + money;

// Guesses