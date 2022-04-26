// Helper functions
export { resetPuzzle };

function resetPuzzle(obj, divContainer, categoryDiv) {
    // Generate randome phrase from object
    let puzzle = obj[Math.floor(Math.random() * obj.length)];
    let arr = puzzle["phrase"].split(" ");
    let category = puzzle["category"];
    generatePuzzle(arr, divContainer, categoryDiv, category);
    return;
}

let start = 0;
let puzzleCount = 0;

function generatePuzzle(wordArr, divContainer, categoryDiv, category) {
    if (start != puzzleCount) {
        clearPreviousPuzzle(divContainer, categoryDiv);
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
    // add to total puzzle count
    puzzleCount++;
}

function clearPreviousPuzzle(divContainer, categoryDiv) {
    divContainer.innerHTML = "";
    categoryDiv.innerHTML = "";
}