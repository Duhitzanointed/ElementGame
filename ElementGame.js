var errors = 0;
var cardList = [
    "beryllium",
    "boron",
    "carbon",
    "fluorine",
    "helium",
    "hydrogen",
    "lithium",
    "neon",
    "nitrogen",
    "oxygen"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    initializeGame();
    document.getElementById("restartButton").addEventListener("click", restartGame); // Attach the restart game function
}

function initializeGame() {
    shuffleCards();
    startGame();
    errors = 0; // Reset errors
    document.getElementById("errors").innerText = errors; // Display the reset error count
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // two of each card
    console.log(cardSet);
    // shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // get random index
        // swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    console.log("Starting game..."); // Debug log
    document.getElementById("board").innerHTML = ""; 

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); // JS

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "img/" + cardImg + ".jpg"; 
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    
    // Hide the cards after a 1 second delay
    setTimeout(() => {
        console.log("Hiding cards..."); // Debug log
        hideCards();
    }, 1000);
}


function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "img/back.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-"); // "0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = "img/" + board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-"); // "0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.src = "img/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    // if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "img/back.jpg";
        card2Selected.src = "img/back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}

function restartGame() {
    board = []; // Reset board
    card1Selected = null; // Reset selected cards
    card2Selected = null; // Reset selected cards
    initializeGame(); // Restart the game setup
}
