// Helper functions
export { resetPuzzle, startingGuessCount, guessAmount, money, dollarAmount, correctLetter, answerLettersArr, removeAlert, letterGuessDelete, puzzleElement, categoryElement, hintElement, bankrollElement, keyboardMakeAGuessBtn, keyboardLettersArr, enterLetter, checkHighlight, potentialPurchaseElement, increaseCurrentGuessesBtn, revealHintBtn, keyboardDeleteBtn, keyboardEnterBtn, checkPotentialPurchase };

// DOM elements
let puzzleElement = document.querySelector(".phrase-container");
let categoryElement = document.querySelector(".category");
let hintElement = document.querySelector(".hint");
let bankrollElement = document.querySelector("#bankroll");
let potentialPurchaseElement = document.querySelector("#potential-purchase");
let alertElement = document.querySelector(".alert-div");

// Keyboard
const keyboardLettersArr = [...document.querySelectorAll(".letter")];
let keyboardDeleteBtn = document.querySelector(".delete-btn");
let keyboardEnterBtn = document.querySelector(".enter");
let keyboardMakeAGuessBtn = document.querySelector(".make-guess-btn");

// buttons
let increaseCurrentGuessesBtn = document.querySelector(".remaining-guesses-btn");
let revealHintBtn = document.querySelector(".hint-btn");

// puzzle
let currentDayPuzzle;
let answerLettersArr;

// TODO:
let currentPuzzleCount = 0;


function resetPuzzle(obj, divContainer, categoryDiv, hintElement, currentMoney, userGuessBtn, lettersArr) {
    // Generate random phrase from object
    let puzzle = obj[Math.floor(Math.random() * obj.length)];
    let arr = puzzle["phrase"].split(" ");
    currentDayPuzzle = puzzle["phrase"];
    let category = puzzle["category"];
    let hint = puzzle["hint"];
    generatePuzzle(arr, divContainer, categoryDiv, category, userGuessBtn, lettersArr);
    addHint(hint, hintElement);

    // reset guesses and bankroll
    guessAmount("reset");
    dollarAmount(currentMoney, 0, "reset");
    enableButtons();
    return;
}

// counters for seeing when puzzle changes
let start = 0;
let puzzleCount = 0;


let longestWord = 0;

function generatePuzzle(wordArr, divContainer, categoryDiv, category, userGuessBtn, lettersArr) {
    if (start != puzzleCount) {
        clearPreviousPuzzle(divContainer, categoryDiv, userGuessBtn, lettersArr);
        start = puzzleCount;
    }

    // set category for puzzle
    categoryDiv.innerHTML = category;

    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i].length > longestWord) {
            longestWord = wordArr[i].length;
        }

        // add div container
        divContainer.innerHTML += `<div class="word-phrases" id="word-phrase-${i}"></div>`;

        // add letters into container
        let tempElem = document.getElementById(`word-phrase-${i}`);
        for (let j = 0; j < wordArr[i].length; j++) {
            
            // make apostrophe's visibile
            let apostropheRegex = /'/;
            if (apostropheRegex.test(wordArr[i][j])) {
                tempElem.innerHTML += `<div class="answer-letter-box"><span class="answer">${wordArr[i][j]}</span></div>`;
            }
            // hide all other letters
            else {
                tempElem.innerHTML += `<div class="answer-letter-box"><span class="answer non-visible">${wordArr[i][j]}</span></div>`;
            }
        }

        // add spaces
        if (i != wordArr.length - 1) {
            tempElem.innerHTML += `<div class="blank-box blank"><span class="blank"></span></div>`;
        }
    }

    // switch phrase box width and height for longest word length
    if (longestWord <= 9) {
        switch(longestWord) {
            case 9:
                document.querySelectorAll(".answer-letter-box").forEach(element => {
                    element.classList.add("length-9");
                });
                break;
            case 8:
                document.querySelectorAll(".answer-letter-box").forEach(element => {
                    element.classList.add("length-8");
                });
                break;
            default:
                document.querySelectorAll(".answer-letter-box").forEach(element => {
                    element.classList.add("length-lower-than-8");
                });
                break;
        }
    }

    if (longestWord <= 7 && wordArr.length >= 5) {
        puzzleElement.classList.add("length-spacer");
    }

    
    answerLettersArr = [...document.querySelectorAll(".answer-letter-box")];
    // add to total puzzle count
    puzzleCount++;
}


// TODO change hintStart to PuzzleCount
let hintCount = 0;
let hintStart = 0;

function addHint(hint, hintElement) {
    hintElement.innerHTML = `<span>HINT: </span>${hint}`;
    if (hintCount != hintStart) {
        if(hintElement.classList.contains("visible")) {
            hintElement.classList.remove("visible");
        }
        hintStart = hintCount;
    }
    hintCount++;
}

function clearPreviousPuzzle(divContainer, categoryDiv, userGuessBtn, lettersArr) {
    //reset puzzle containers
    divContainer.innerHTML = "";
    categoryDiv.innerHTML = "";

    // reset guess mode and previous used letters
    for (let letter of lettersArr) {
        letter.classList.remove("correct", "incorrect", "highlight");
    }
    // reset guess mode
    userGuessBtn.classList.remove("guess-mode", "guess-highlight");

    // reset potential purchas
    potentialPurchaseElement.innerHTML= "";

    // reset hint
    document.querySelector(".hint-container").classList.remove(".game-play");

    // add back margin to category div
    document.querySelector(".category-hint").classList.remove("remove-margin-bottom");

    return;
}

let startingGuessCount = 2
document.querySelector(".guesses-left").innerHTML = startingGuessCount;
document.querySelector(".header-remaining-guesses").innerHTML = startingGuessCount;

function guessAmount(resetGuesses=undefined) {
    if (resetGuesses != undefined) {
        startingGuessCount = 2;
    }
    else {
        startingGuessCount--;
        document.querySelector(".guesses-left").innerHTML = startingGuessCount;
        document.querySelector(".header-remaining-guesses").innerHTML = startingGuessCount;

        setttingForGuessAmount();
    }
}

function guessAddCount() {
    startingGuessCount++;
    document.querySelector(".guesses-left").innerHTML = startingGuessCount;
    document.querySelector(".header-remaining-guesses").innerHTML = startingGuessCount;

    setttingForGuessAmount();   
}

function setttingForGuessAmount() { 
    if(startingGuessCount >= 2) {
        document.querySelector(".remaining-guesses-btn").classList.remove("zero-remaining");
        document.querySelector(".remaining-guesses-btn").classList.remove("one-remaining");
    }
    else if(startingGuessCount === 1) {
        document.querySelector(".remaining-guesses-btn").classList.add("one-remaining");
        document.querySelector(".remaining-guesses-btn").classList.remove("zero-remaining");
    }
    else if(startingGuessCount === 0) {
        document.querySelector(".remaining-guesses-btn").classList.add("zero-remaining");
        document.querySelector(".remaining-guesses-btn").classList.remove("one-remaining");
    }
    return;
}


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

function checkBankroll(dollars) {
    if(money >= dollars) {
        return true;
    }
    return false;
}

function correctLetter(letter=undefined) {
    if(letter != undefined) {
        return currentDayPuzzle.includes(letter);
    }
}

function removeAlert(alert) {
    alert.innerHTML = "";
    alert.classList.remove("add-alert");
}

function checkHighlight(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains("highlight")) {
            arr[i].classList.remove("highlight");
        }
    }
}

/*=========================
ADDING AND DELETING LETTERS
=========================*/
function letterGuessDelete(...args) {
    // GUESS MODE ACTIVE \\
    if (keyboardMakeAGuessBtn.classList.contains("guess-mode")) {
        // Delete route
        if (args[0] == "delete") {
            for (let i = answerLettersArr.length - 1; i > 0; i--) {
                if (answerLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                    // if last element, keep guess mode highlight
                    for(let j = i; j < answerLettersArr.length; j++) {
                        if(answerLettersArr[j].lastElementChild.classList.contains("added-guess-input")) {
                            answerLettersArr[i].removeChild(answerLettersArr[i].lastElementChild);
                            return;
                        }
                        if(answerLettersArr[j+1] == undefined && !answerLettersArr[j].lastElementChild.classList.contains("added-guess-input")) {
                            answerLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            break;
                        }
                        else {
                            answerLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            break;
                        }
                    }

                    // keep highlight on first avalable box
                    let tempArr = [];
                    for(let j = 0; j < i; j++) {
                        tempArr.push(answerLettersArr[j]);
                    }
                    
                    let availableBox = tempArr.some((element) => element.firstElementChild.classList.contains("non-visible"));

                    if (!availableBox) {
                        answerLettersArr[i].classList.add("guess-mode-current-guess-box");
                        return;
                    }
                    
                    // locate previous box to highlight
                    let counter = 1;
                    while (answerLettersArr[i-counter] != undefined) {
                        if (answerLettersArr[i-counter].firstElementChild.classList.contains("non-visible")) {
                            answerLettersArr[i-counter].classList.add("guess-mode-current-guess-box");
                            answerLettersArr[i-counter].removeChild(answerLettersArr[i-counter].lastElementChild);
                            return
                        }
                        else {
                            counter++;
                        }
                    } 
                }
            }
        }

        // Exit guess mode
        if (args[0] == "guess") {
            keyboardMakeAGuessBtn.classList.remove("guess-mode");
            keyboardMakeAGuessBtn.classList.remove("guess-highlight");
            potentialPurchaseElement.innerHTML = "";

            // remove current guesses
            for(let i = 0; i < answerLettersArr.length; i++) {
                if (answerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                    answerLettersArr[i].removeChild(answerLettersArr[i].lastElementChild);
                }
                // remove highlighted box
                if (answerLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                    answerLettersArr[i].classList.remove("guess-mode-current-guess-box");
                }
                
            }
            return;
        }

        // Enter Letters
        else if (args[0] == "letter") {
            for(let i = 0; i < answerLettersArr.length; i++) {
                if (answerLettersArr[i].firstElementChild.classList.contains("non-visible") && !answerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {

                    // if keyboard input
                    if (args[1] == "keyboard") {
                        answerLettersArr[i].innerHTML += `<i class="added-guess-input">${args[2]}</i>`;
                    }
                     // mouse click addition
                    else {
                        let tempArr = args[1].textContent.split("$");
                        answerLettersArr[i].innerHTML += `<i class="added-guess-input">${tempArr[0]}</i>`;
                    }
                    // remove highlight from box unless last viable box
                    let tempCount = 1
                    while(answerLettersArr[i+tempCount] != undefined) {
                        if (answerLettersArr[i+tempCount].firstElementChild.classList.contains("non-visible")) {
                            answerLettersArr[i].classList.remove("guess-mode-current-guess-box");
                            answerLettersArr[i+tempCount].classList.add("guess-mode-current-guess-box");
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

    // GUESS MODE INACTIVE \\
    else {
        // if guess btn pressed turn guess mode on
        if (args[0] == "guess") {
            // remove any highlighted letters
            checkHighlight(keyboardLettersArr);

            keyboardMakeAGuessBtn.classList.add("guess-mode");
            keyboardMakeAGuessBtn.classList.add("guess-highlight");

            // alert user of possible letter purchase
            if(startingGuessCount > 0 && (money <= 140 && money >= 40)) {
                alertElement.classList.add("add-alert");
                alertElement.innerHTML = "There are still letters for purchase!";
                setTimeout(removeAlert, 3000, alertElement); 
            }

            // add phrase box highlight
            for(let i = 0; i < answerLettersArr.length; i++) {
                if (answerLettersArr[i].firstElementChild.classList.contains("non-visible") && !answerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {

                    answerLettersArr[i].classList.add("guess-mode-current-guess-box")
                    return;
                }
            }          
            return;
        }
        // else regular guess with letter
        else {
            if (args[1] == "keyboard") {
                for(let i = 0; i <keyboardLettersArr.length; i++) {
                    if (keyboardLettersArr[i].textContent[0] == args[2].toLowerCase()) {
                        if (keyboardLettersArr[i].classList.contains("incorrect") || keyboardLettersArr[i].classList.contains("correct")) {
                            return;
                        }
                        checkHighlight(keyboardLettersArr);
                        keyboardLettersArr[i].classList.add("highlight");
                    }
                }
            }
            else {
                if (args[1].classList.contains("incorrect") || args[1].classList.contains("correct"))
                {
                    return;
                }
                checkHighlight(keyboardLettersArr);
                args[1].classList.add("highlight");
            }
            // get highlighted letter
            let letter = document.querySelector(".highlight");
            
            // get value of letter and cost
            let tempArr = letter.textContent.split("$");
            checkPotentialPurchase(tempArr[1]);
        }
    }
}

let hintTotal = 0;

/*===========================
ENTERING USER INPUT INTO GAME
===========================*/  
function enterLetter() {
    // HINT ROUTE \\
    if(revealHintBtn.classList.contains("hint-focus") && hintTotal != 1) {
        if(!checkBankroll(150)) {
            revealHintBtn.classList.remove("hint-focus");
            potentialPurchaseElement.innerHTML = "";
            return;
        }

        document.querySelector(".hint-container").classList.add("game-play");
        hintElement.classList.add("visible");
        document.querySelector(".category-hint").classList.add("remove-margin-bottom");


        potentialPurchaseElement.innerHTML = "";
        dollarAmount(bankrollElement, 150);

        checkGameLoss();

        hintTotal++;
        return;
    }

    // ADD GUESSES ROUTE \\
    if(increaseCurrentGuessesBtn.classList.contains("guess-focus-default") || increaseCurrentGuessesBtn.classList.contains("guess-focus-one") || increaseCurrentGuessesBtn.classList.contains("guess-focus-zero")) {
        potentialPurchaseElement.innerHTML = "";

        increaseCurrentGuessesBtn.classList.remove("guess-focus-default");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-one");
        increaseCurrentGuessesBtn.classList.remove("guess-focus-zero");

        if(!checkBankroll(150)) {
            return;
        }

        dollarAmount(bankrollElement, 150);
        guessAddCount();
        return;
    }

    // GUESS MODE INACTIVE \\
    if (!keyboardMakeAGuessBtn.classList.contains("guess-mode")) {
        // get highlighted letter
        let letter = document.querySelector(".highlight");
        if (letter === null) {
            return;
        }
        
        // get value of letter and cost
        let tempArr = letter.textContent.split("$");

        if(!checkBankroll(tempArr[1])) {
            return;
        }
        
        // see if guess was correct
        let result = correctLetter(tempArr[0]);

        // subtrack letter cost from current money
        dollarAmount(bankrollElement, tempArr[1]);

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

        if(puzzleSolved()) {
            setTimeout(winGameEnd, 300);
            disableActionButtons();
            return;
        }
        else {
            checkGameLoss();
            return;
        }
    }
    // GUESS MODE ACTIVE \\
    else {
        // alert user to buy another guess
        if(startingGuessCount == 0 && money >= 150) {
            alertElement.classList.add("add-alert");
            alertElement.innerHTML = "Purchase another guess before its too late!";
            setTimeout(removeAlert, 3000, alertElement);
            return;     
        }
        
        if(startingGuessCount == 0 && money < 150) {
            checkGameLoss();
            return;
        }

        // check to make sure all phrase boxes filled
        if (!answerLettersArr.filter(element => element.firstElementChild.classList.contains("non-visible")).every(element => element.lastElementChild.classList.contains("added-guess-input"))) {
            alertElement.classList.add("add-alert");
            alertElement.innerHTML = "Please enter input for all boxes before entering";
            setTimeout(removeAlert, 3000, alertElement);
            return;            
        }

        // if all boxes filled check against answer
        for (let i = 0; i < answerLettersArr.length; i++) {
            if (answerLettersArr[i].lastElementChild.classList.contains("added-guess-input")) {
                if (answerLettersArr[i].lastElementChild.innerHTML == answerLettersArr[i].firstElementChild.innerHTML) {
                    answerLettersArr[i].classList.add("correct-letter-fade");
                    answerLettersArr[i].firstElementChild.classList.remove("non-visible");
                }
                // remove the guessed letters
                answerLettersArr[i].removeChild(answerLettersArr[i].lastElementChild);
                if (answerLettersArr[i].classList.contains("guess-mode-current-guess-box")) {
                    answerLettersArr[i].classList.remove("guess-mode-current-guess-box");
                }
            }
        }

        // add back guess-highlight to first available
        for (let first of answerLettersArr) {
            if (first.firstElementChild.classList.contains("non-visible")) {
                first.classList.add("guess-mode-current-guess-box");
                break;
            }
        } 

        guessAmount();

        if(puzzleSolved()) {
            setTimeout(winGameEnd, 300);
            disableActionButtons();
        }
        else if (startingGuessCount == 0 && money < 150) {
            checkGameLoss();
        }
    }

}

function puzzleSolved() {
    return answerLettersArr.every(element => {
        return !element.firstElementChild.classList.contains("non-visible")
    });
}

function winGameEnd(){
    let storedCash = parseInt(localStorage.getItem("streak-cash"));

    document.querySelector(".overlay-game-win").classList.toggle("game-play");
    setTimeout(function() {
        document.querySelector(".overlay-game-win").classList.toggle("fade");
    }, 20);
    setTimeout(function() {
        document.querySelector(".game-stats-overlay").classList.toggle("translate");
    }, 10);
    if (localStorage.getItem("streak-cash") !== null) {
        let newCashBalance = storedCash + money;
        localStorage.setItem("streak-cash", newCashBalance);
        document.querySelector(".money-added").innerHTML += `$${money}`;
        document.querySelector(".streak-total").innerHTML = `$${newCashBalance}!`;

        // win phrase
        document.querySelector(".game-end-phrase").innerHTML = "Impressive!";

        // highest streak
        let highestCashBalance = parseInt(localStorage.getItem("highest-streak"));
        if(newCashBalance > highestCashBalance) {
            highestCashBalance = newCashBalance;
            localStorage.setItem("highest-streak", highestCashBalance);
            document.querySelector(".highest-streak").innerHTML = `$${highestCashBalance}`;
        }
        else {
            document.querySelector(".highest-streak").innerHTML = `$${highestCashBalance}`;
        }
        return
    }
    // first win
    document.querySelector(".money-added").innerHTML += `$${money}`;
    localStorage.setItem("streak-cash", money);
    document.querySelector(".streak-total").innerHTML = `$${money}!`;
    localStorage.setItem("highest-streak", money); 
    document.querySelector(".highest-streak").innerHTML = `$${money}`;
}


function disableActionButtons() {
    document.querySelectorAll(".letter").forEach(element => {
        element.setAttribute("disabled", "");
    });
    keyboardMakeAGuessBtn.setAttribute("disabled", "");
    keyboardEnterBtn.setAttribute("disabled", "");
    keyboardDeleteBtn.setAttribute("disabled", "");
    revealHintBtn.setAttribute("disabled", "");
    increaseCurrentGuessesBtn.setAttribute("disabled", "");
    return;
}

function enableButtons() {
    document.querySelectorAll(".letter").forEach(element => {
        element.removeAttribute("disabled");
    });
    keyboardMakeAGuessBtn.removeAttribute("disabled");
    keyboardEnterBtn.removeAttribute("disabled");
    keyboardDeleteBtn.removeAttribute("disabled");
    revealHintBtn.removeAttribute("disabled");
    increaseCurrentGuessesBtn.removeAttribute("disabled", "");
    return;
}

function checkPotentialPurchase(Cost) {
        // check if guesses left and money will not allow for further purchase of guess
        if(startingGuessCount == 0) {
            if(money < 150) {
                return;
            }
            else if(money - Cost < 150) {
                alertElement.classList.add("add-alert");
                alertElement.innerHTML = "You sure? This purchase without any guesses left could lose you the game...";
                keyboardEnterBtn.setAttribute("disabled", "");
                setTimeout(() => keyboardEnterBtn.removeAttribute("disabled"), 2500);                
                setTimeout(removeAlert, 5000, alertElement);
                return;
            } 
        }
}

function checkGameLoss() {
    if(!puzzleSolved() && startingGuessCount == 0 && money < 150) {
        //check values left of letters in puzzle
        let lettersLeft = answerLettersArr.filter(element => element.firstElementChild.classList.contains("non-visible")).map(element => element.firstElementChild.textContent);

        let map = new Map();

        for(let i = 0; i < lettersLeft.length; i++) {
            if(!map.has(lettersLeft[i])) {
                map.set(lettersLeft[i], alphabetValues[lettersLeft[i]]);
            }
        }
        let totalValuelettersUnsovled = Array.from(map.values());

        let dollarValue = 0;
        for(let i = 0; i < totalValuelettersUnsovled.length; i++) {
            dollarValue += totalValuelettersUnsovled[i];
        }

        if(dollarValue > money) {
            gameLose();
        }
        else {
            alertElement.classList.add("add-alert");
            alertElement.innerHTML = "There is still hope! Choose letters wisely...";
            keyboardEnterBtn.setAttribute("disabled", "");
            setTimeout(() => keyboardEnterBtn.removeAttribute("disabled"), 1000);
            setTimeout(removeAlert, 3500, alertElement);
            return;
        }
    }
}

function gameLose() {
    disableActionButtons();
    
    // reveal puzzle
    let remainingPuzzle = answerLettersArr.filter(element => element.firstElementChild.classList.contains("non-visible"));

    for (let i = 0; i < remainingPuzzle.length; i++) {
        let timeAdder = i * 500;
        setTimeout(() => {
            remainingPuzzle[i].firstElementChild.classList.remove("non-visible");
            remainingPuzzle[i].classList.add("correct-letter-fade");
            remainingPuzzle[i].classList.remove("guess-mode-current-guess-box");
            remainingPuzzle[i].firstElementChild.classList.add("game-loss-color");
        }, timeAdder);
    }

    // set game-stats items
    localStorage.setItem("streak-cash", 0);
    document.querySelector(".streak-total").innerHTML = "$0";
    document.querySelector(".game-end-phrase").innerHTML = "That was tough, but you're tougher! See you tomorrow...";
    document.querySelector(".money-added").innerHTML += "$0";

    // check for highest streak
    let highestStreak = localStorage.getItem("highest-streak");
    if(highestStreak !== null) {
        document.querySelector(".highest-streak").innerHTML = `$${highestStreak}`;
    } 
    else {
        document.querySelector(".highest-streak").innerHTML = "-";
    }

    setTimeout( () => {
    // add overlay
    document.querySelector(".overlay-game-win").classList.toggle("game-play");
    setTimeout(function() {
        document.querySelector(".overlay-game-win").classList.toggle("fade");
    }, 20);
    setTimeout(function() {
        document.querySelector(".game-stats-overlay").classList.toggle("translate");
    }, 10);
    }, remainingPuzzle.length * 500 + 1000);


}

const alphabetValues = {
    "a": 130,
    "b": 60,
    "c": 80,
    "d": 80,
    "e": 140,
    "f": 60,
    "g": 70,
    "h": 70,
    "i": 110,
    "j": 30,
    "k": 50,
    "l": 80,
    "m": 70,
    "n": 100,
    "o": 90,
    "p": 80,
    "q": 30,
    "r": 120,
    "s": 120,
    "t": 120,
    "u": 80,
    "v": 50,
    "w": 50,
    "x": 40,
    "y": 60,
    "z": 40,
}