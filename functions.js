// Helper functions
export { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, purchases, removeAlert, checkHighlight };


// puzzle
let dailyPuzzle;


function resetPuzzle(obj, divContainer, categoryDiv, hintElement, guessArr, currentMoney) {
    // Generate random phrase from object
    let puzzle = obj[Math.floor(Math.random() * obj.length)];
    let arr = puzzle["phrase"].split(" ");
    dailyPuzzle = puzzle["phrase"];
    let category = puzzle["category"];
    let hint = puzzle["hint"];
    generatePuzzle(arr, divContainer, categoryDiv, category, guessArr);
    addHint(hint, hintElement);
    guessAmount("clear");
    dollarAmount(currentMoney, 0, "clear");
    return;
}

// counters for seeing when puzzle changes
let start = 0;
let puzzleCount = 0;

// phrase array
let phraseLettersArr;

function generatePuzzle(wordArr, divContainer, categoryDiv, category, guessArr) {
    if (start != puzzleCount) {
        clearPreviousPuzzle(divContainer, categoryDiv, guessArr);
        start = puzzleCount;
    }

    // set category for puzzle
    categoryDiv.innerHTML = category;

    for (let i = 0; i < wordArr.length; i++) {
        // add div container
        divContainer.innerHTML += `<div class="word-phrases" id="word-phrase-${i}"></div>`;

        // add letters into container
        let tempElem = document.getElementById(`word-phrase-${i}`);
        for (let j = 0; j < wordArr[i].length; j++) {
            
            // check for and make apostrophe's visibile
            let apostropheRegex = /'/;
            if (apostropheRegex.test(wordArr[i][j])) {
                tempElem.innerHTML += `<div class="letter-box"><span class="answer">${wordArr[i][j]}</span></div>`;
            }
            // hide all other letters
            else {
                tempElem.innerHTML += `<div class="letter-box"><span class="answer non-visible">${wordArr[i][j]}</span></div>`;
            }
        }

        // add spaces
        if (i != wordArr.length - 1) {
            tempElem.innerHTML += `<div class="blank-box blank"><span class="blank"></span></div>`;
        }
    }
    phraseLettersArr = [...document.querySelectorAll(".letter-box")];
    // add to total puzzle count
    puzzleCount++;
}

let hintCount = 0;
let hintStart = 0;

function addHint(hint, hintElement) {
    // TODO: check if out of guesses
    hintElement.innerHTML = `<span>HINT: </span>${hint}`;
    if (hintCount != hintStart) {
        if(hintElement.classList.contains("visible")) {
            hintElement.classList.remove("visible");
        }
        hintStart = hintCount;
    }
    hintCount++;
}

// clear generated puzzle | hint | category
function clearPreviousPuzzle(divContainer, categoryDiv, guessArr) {
    divContainer.innerHTML = "";
    categoryDiv.innerHTML = "";
    for (let elem of guessArr) {
        elem.firstElementChild.innerHTML = "";
        elem.lastElementChild.innerHTML = "";
    }
    return;
}

// guesses handler
let guessCount = 0
function guessAmount(clearGuesses=undefined) {
    if (clearGuesses != undefined) {
        guessCount = 0;
    }
    else {
        guessCount++;
    }
}

// money handler
let money = 1000;
function dollarAmount(currentMoney, dollars=0, clearMoney=undefined) {
    if (clearMoney != undefined) {
        money = 1000;
        currentMoney.innerHTML = "$ " + money;
    }
    else {
        money -= dollars;
        currentMoney.innerHTML = "$ " + money.toFixed(0);
    }
}

// check puzzle for correct letter
function correctLetter(letter=undefined) {
    if(letter != undefined) {
        return dailyPuzzle.includes(letter);
    }
}


// add purchases
function purchases(arr, letter, value, classToAdd) {
    arr[guessCount].firstElementChild.innerHTML = letter;
    arr[guessCount].firstElementChild.classList.add(classToAdd);
    arr[guessCount].lastElementChild.innerHTML = `-$${value}`;
    arr[guessCount].lastElementChild.classList.add(classToAdd);
}

// || ALERT FUNCTION || \\
function removeAlert(alert) {
    alert.innerHTML = "";
}

// || CHECK FOR HIGHLIGHT || \\
function checkHighlight(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains("highlight")) {
            arr[i].classList.remove("highlight");
        }
    }
}