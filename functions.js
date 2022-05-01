// Helper functions
export { resetPuzzle, guessCount, guessAmount, money, dollarAmount, correctLetter, phraseLettersArr, purchases, removeAlert, letterGuessDelete, insertPhrase, categoryDiv, hintElement, guessArr,  currentMoney, userGuessBtn, lettersArr, enterLetter };

// content reset elements
let insertPhrase = document.querySelector(".phrase-container");
let categoryDiv = document.querySelector(".category");
let hintElement = document.querySelector(".hint");
let guessArr = [...document.querySelectorAll(".guess-box")];
let currentMoney = document.querySelector("#bankroll");
let userGuessBtn = document.querySelector(".make-guess-btn");
const lettersArr = [...document.querySelectorAll(".letter")];
let potentialPurchase = document.querySelector("#potential-purchase");

// puzzle
let dailyPuzzle;


function resetPuzzle(obj, divContainer, categoryDiv, hintElement, guessArr, currentMoney, userGuessBtn, lettersArr) {
    // Generate random phrase from object
    let puzzle = obj[Math.floor(Math.random() * obj.length)];
    let arr = puzzle["phrase"].split(" ");
    dailyPuzzle = puzzle["phrase"];
    let category = puzzle["category"];
    let hint = puzzle["hint"];
    generatePuzzle(arr, divContainer, categoryDiv, category, guessArr, userGuessBtn, lettersArr);
    addHint(hint, hintElement);

    // reset guesses and bankroll
    guessAmount("clear");
    dollarAmount(currentMoney, 0, "clear");
    enableButtons();
    return;
}

// counters for seeing when puzzle changes
let start = 0;
let puzzleCount = 0;

// phrase array
let phraseLettersArr;

function generatePuzzle(wordArr, divContainer, categoryDiv, category, guessArr, userGuessBtn, lettersArr) {
    if (start != puzzleCount) {
        clearPreviousPuzzle(divContainer, categoryDiv, guessArr, userGuessBtn, lettersArr);
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
            
            // make apostrophe's visibile
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
    hintElement.innerHTML = `<span>HINT: </span>${hint}`;
    if (hintCount != hintStart) {
        if(hintElement.classList.contains("visible")) {
            hintElement.classList.remove("visible");
        }
        hintStart = hintCount;
    }
    hintCount++;
}

function clearPreviousPuzzle(divContainer, categoryDiv, guessArr, userGuessBtn, lettersArr) {
    //reset puzzle containers
    divContainer.innerHTML = "";
    categoryDiv.innerHTML = "";
    for (let elem of guessArr) {
        elem.firstElementChild.innerHTML = "";
        elem.lastElementChild.innerHTML = "";

        // remove any added classes
        elem.firstElementChild.classList.remove("hint-guess", "incorrect-guess", "correct-guess", "guess-guess");
        elem.lastElementChild.classList.remove("hint-guess", "incorrect-guess", "correct-guess", "guess-guess");
    }

    // reset guess mode and previous used letters
    for (let letter of lettersArr) {
        letter.classList.remove("correct", "incorrect", "highlight");
    }
    
    userGuessBtn.classList.remove("guess-mode", "guess-highlight");

    potentialPurchase.innerHTML= "";

    return;
}

let guessCount = 0

function guessAmount(clearGuesses=undefined) {
    if (clearGuesses != undefined) {
        guessCount = 0;
    }
    else {
        guessCount++;
    }
    if (guessCount == 9) {
        letterGuessDelete("guess");
    }
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

function correctLetter(letter=undefined) {
    if(letter != undefined) {
        return dailyPuzzle.includes(letter);
    }
}

function purchases(arr, letter, value, classToAdd) {
    arr[guessCount].firstElementChild.innerHTML = letter;
    arr[guessCount].firstElementChild.classList.add(classToAdd);
    arr[guessCount].lastElementChild.innerHTML = `-$${value}`;
    arr[guessCount].lastElementChild.classList.add(classToAdd);
}

function removeAlert(alert) {
    alert.innerHTML = "";
}

function checkHighlight(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains("highlight")) {
            arr[i].classList.remove("highlight");
        }
    }
}

/*
    ===========================
    ADDING AND DELETING LETTERS
    ===========================
*/
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

                    // keep highlight on first avalable box
                    let tempArr = [];
                    for(let j = 0; j < i; j++) {
                        tempArr.push(phraseLettersArr[j]);
                    }
                    
                    let availableBox = tempArr.some((element) => element.firstElementChild.classList.contains("non-visible"));

                    if (!availableBox) {
                        phraseLettersArr[i].classList.add("guess-mode-current-guess-box");
                        return;
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
            //must make guess on last purchase
            if(guessCount == 9) {
                return;
            }

            userGuessBtn.classList.remove("guess-mode");
            userGuessBtn.classList.remove("guess-highlight");
            potentialPurchase.innerHTML = "";

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

            potentialPurchase.innerHTML = "-" + Math.round(Math.ceil((money * 0.15) * 100) / 100); 

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

        if(puzzleSolved()) {
            winGameEnd();
            disableActionButtons();
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

        potentialPurchase.innerHTML = "-" + Math.round(Math.ceil((money * 0.15) * 100) / 100); 

        // add purchase
        if (guessCount < guessArr.length) {
            purchases(guessArr, "?", guessSubtract, "guess-guess");
            guessAmount();
        }

        if(puzzleSolved()) {
            winGameEnd();
            disableActionButtons();
        }
    }

}

function puzzleSolved() {
    return phraseLettersArr.every(element => {
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
    if(storedCash) {
        if (storedCash != 0) {
            let newCashBalance = storedCash + money;
            localStorage.setItem("streak-cash", newCashBalance);
            storedCash = newCashBalance;
            document.querySelector(".streak-total").innerHTML = newCashBalance + "!";

            // highest streak
            let highestCashBalance = parseInt(localStorage.getItem("highest-streak"));
            if(newCashBalance > highestCashBalance) {
                highestCashBalance = newCashBalance;
                localStorage.setItem("highest-streak", highestCashBalance);
                document.querySelector(".highest-streak").innerHTML = highestCashBalance;
            }
            return;
        }
        return
    }

    // first win
    localStorage.setItem("streak-cash", money);
    document.querySelector(".streak-total").innerHTML = money + "!";
    localStorage.setItem("highest-streak", money); 
    document.querySelector(".highest-streak").innerHTML = money;
}


function disableActionButtons() {
    document.querySelectorAll(".letter").forEach(element => {
        element.setAttribute("disabled", "");
    });
    document.querySelector(".make-guess-btn").setAttribute("disabled", "");
    document.querySelector(".enter").setAttribute("disabled", "");
    document.querySelector(".delete-btn").setAttribute("disabled", "");
    document.querySelector(".hint-btn").setAttribute("disabled", "");
    return;
}

function enableButtons() {
    document.querySelectorAll(".letter").forEach(element => {
        element.removeAttribute("disabled");
    });
    document.querySelector(".make-guess-btn").removeAttribute("disabled");
    document.querySelector(".enter").removeAttribute("disabled");
    document.querySelector(".delete-btn").removeAttribute("disabled");
    document.querySelector(".hint-btn").removeAttribute("disabled");
    return;
}