// This is the game of Tic Tac Toe. Play will alternate between player x and
// player o until a winner or a tie is determined.
//
// The requirements for this game are as follows:
//   Display which players turn it is.
//   Display which player has won the game.
//   Display if the game is a tie/draw.
//   Once a button is clicked it can not be reclicked aka replayed.
//   Once a winner is determined the game board cannot be clicked.
//   The game board can be reset by a button.
//


// This function will display the a message passed in as a parameter
//   and update the message display area.
const displayMessage = (msg) => {

    // Check if a prior message exists and if it does then remove it.
    const priorH2 = document.getElementById("gameMessage");
    if (priorH2 != null) {
        priorH2.remove();
    }

    // // Create new message area and add msg to the element
    const h2 = document.createElement("h2");
    h2.innerText = msg;
    h2.setAttribute("id","gameMessage");

    // Add the new element to the body updating the message area
    document.body.appendChild(h2);

}

// This function will reset the game board and remove any messages.
const resetGameBoard = () => {

    // Reinitialize for a New Game Board.
    player = "X";
    turnString = `It is player ${player}'s turn now!`;
    displayMessage(turnString);

    // This will reset the entire game board.
    // for each row array on the game board.
    for (let row = 0; row < gameBoard.length; row++) {

        // for each element that is a column in that row array
        for (let column = 0; column < gameBoard[row].length; column++) {
            // reset the game board element
            gameBoard[row][column] = "";
        }
    }

    // Clear all the buttons to remove X's and O's
    // Loop over the button boxes to add Listener events.
    allButtons.forEach(function (button) {
        button.addEventListener("click", buttonClicked);

        // Update the prior Xs and Os on each box by removing any displayed
        //   text
        button.innerText = "";
    } );
}


// This function will disable the game board by removing
//    the clickable buttons.
const disableGameBoard = () => {
    allButtons.forEach(function (button) {
        button.removeEventListener("click", buttonClicked);
    } );

}

// This function will search the game board to see if it is filled with
//  entries. If it is full it will return true as this is a draw condition.
//  if it is not filled it will determine it is not a draw.
const searchDraw = (player) => {
    // If all the gameBoard is filled - it is a draw.
    for (let i=0; i < gameBoard.length; i++) {
        for (let j= 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === "") {
                return(false);
            }
        }
    }
    return(true);

}

// This function will check both diagonals and if one has all elements the 
//   same as the player it will return a true;
const searchDiagonals = (player) => {

    if ((gameBoard[0][0] === player) &&
        (gameBoard[1][1] === player) &&
        (gameBoard[2][2] === player)) {
        return true;
    }
    if ((gameBoard[0][2] === player) &&
        (gameBoard[1][1] === player) &&
        (gameBoard[2][0] === player)) {
        return true;
    }
    return false;
}

// This function will search a single row to see if the elements specified by
//   player in the row are all the same.
const searchSingleRow = (row, player) => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] != player)
            return false;
    }
    return true;
}

// This function will search a single column in the gameBoard to see
//  if the elements match the player.
const searchSingleColumn = (gameBoard, colIndex, player) => {

    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][colIndex] != player) {
            return false;
        }
    }
    return true;
}

// This function will search all the columns in the game board for the matching 
//  letters and returns true is every element in the column matches.  It must
//  take care to only look for matches for the specific player.

const searchColumns = (player) => {

    if (searchSingleColumn(gameBoard, 0, player) ||
        searchSingleColumn(gameBoard, 1, player) ||
        searchSingleColumn(gameBoard, 2, player)) {
        return true;
    } else {
        return false;
    }
}

// This function will search all the rows in the game board for the matching 
//  letters and returns true is every element in the row matches.  It must
//  take care to only look for matches for the specific player.
const searchRows = (player) => {

    if (searchSingleRow(gameBoard[0], player) ||
        searchSingleRow(gameBoard[1], player) ||
        searchSingleRow(gameBoard[2], player)) {
        return true;
    } else {
        return false;
    }
}
// This function is the heart of the tic tac toe and will search the gameBoard
//   to see if there is a winner.  It will check all rows and columns.
//   
const searchWinner = (player) => {
    return(searchRows(player) || searchColumns(player) || searchDiagonals(player))
} 

// This function is what happens when a player clicks a button.
//   1. The button row and column attributes must be retrieved.
//   2. The internal gameBoard must be updated.
//   3. The player X or O must mark the html grid.
//   4. Check whether the player won or a tie was produced.
//   5. Disable the click for the button.
//   5. Setup for the next players turn.

const buttonClicked = (e) => {

    // Get the row and column on the board of the button clicked.
    const gameRow = e.target.getAttribute("data-row");
    const gameColumn = e.target.getAttribute("data-column");

    // Update the game board.
    gameBoard[gameRow][gameColumn] = player;

    // Update the text according to whether play was X or O.
    e.target.innerText = player;

    // Make this button unclickable!!!
    e.target.removeEventListener("click",buttonClicked);

    // Check if player won or it was a tie.
    if (searchWinner(player)) {
        // Output Winner Message.
        winnerString = `Player ${player} has won the game!`; 
        displayMessage(winnerString);

        // Disable clicks from the game board.
        disableGameBoard();

        return;
    } else if (searchDraw(player)) {
        displayMessage(tieString);
    } else {
       // Set for the next player.
       // (player === x) ? player = o : player = x;
        (player === "X") ? player = "O" : player = "X";
        turnString = `It is player ${player}'s turn now!`;

        displayMessage(turnString);
    }
}

// This function will initialize the tic tac toe buttons 
//   for the game board and makes them all clickable.  It also sets
//   up the reset button as clickable.
const initTicTacToeButtons = () => {

    // Loop over the button boxes to add Listener events.
    allButtons.forEach(function (button) {
        button.addEventListener("click", buttonClicked);
    } );

    //Initialize reset button
    let resetButton = document.querySelector(".resetGame");
        resetButton.addEventListener("click", resetGameBoard);
}

//--------------------------------------------------------------------
// Initialize the Game Board:
//   Set the player to X, set the game board to started and initialize
//   all pieces in the game board.
//   Retrieve where the game messages will be displayed in the browser.

let player = "X";
let gameBoard = [
    ["","",""],
    ["","",""],
    ["","",""]
];
let tieString = "The game is a tie!";
let winnerString = `Player ${player} has won the game!`; 
let turnString = `It is player ${player}'s turn now!`;
let allButtons = document.querySelectorAll('.box');

// Initialize game message display area with players turns. 
// Initializes tic tac toe buttons.
displayMessage(turnString);
initTicTacToeButtons();