let playerTurn = true;
let computerMoveTimeout = 0;
let oPlayer = "O";
let xPlayer = "X";

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	X_WINS: 2,
	O_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", function(){newGame(false);});

	const nameBtn = document.getElementById("newNames");
	nameBtn.addEventListener("click", function(){newGame(true);});

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.setAttribute("disabled", true);
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame(false);
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			const buttonsOn = document.getElementById("gameBoard")
			for (let i = 0; i < buttonsOn.children.length; i++) {
				buttonsOn.children[i].setAttribute("disabled", true);
			}
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.X_WINS;
			}
			else {
				return gameStatus.O_WINS;
			}
		}
	}

	// See if any more moves are left
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame(getNames) {
	document.getElementById("newGameButton").setAttribute("disabled", true);
	if(getNames == true){
		xPlayer = playersName("X");
		oPlayer = playersName("O");
	}
	document.getElementById("newGameButton").removeAttribute("disabled");
	const buttonsOn = document.getElementById("gameBoard")
	for (let i = 0; i < buttonsOn.children.length; i++) {
	   	buttonsOn.children[i].innerHTML = "";
		buttonsOn.children[i].removeAttribute("class");
		buttonsOn.children[i].removeAttribute("disabled");
		playerTurn = true;
		document.getElementById("turnInfo").setAttribute("class", "text-center");
		document.getElementById("turnInfo").innerHTML = `${xPlayer}'s turn`;
	};// TODO: Complete the function
}

function playersName(player){
	let playerName = prompt(`Please enter the name of the person playing ${player}.`);
	if(playerName == null || playerName == ""){
		return player;
	}
	return playerName;
}
 
function boardButtonClicked(button) {
	if (playerTurn == true) {
	   	button.innerHTML = "X";
	   	button.setAttribute("class", "text-danger bg-secondary-subtle");
	   	button.setAttribute("disabled", true);
	   	switchTurn();
	} else {
		button.innerHTML = "O";
	   	button.setAttribute("class", "text-primary bg-warning-subtle");
	   	button.setAttribute("disabled", true);
	   	switchTurn();
	};// TODO: Complete the function
}
 
function switchTurn() {
	if (checkForWinner() == 1) {
	   	if (playerTurn == true) {
		  	playerTurn = !playerTurn;
		  	document.getElementById("turnInfo").innerHTML = `${oPlayer}'s turn`;
	   	} else {
			playerTurn = !playerTurn;
		  	document.getElementById("turnInfo").innerHTML = `${xPlayer}'s turn`;
	   	};
	} else {
		playerTurn = false;
		if (checkForWinner() == 2) {
			document.getElementById("turnInfo").classList.add("display-1", "text-danger");
			document.getElementById("turnInfo").innerHTML = `${xPlayer} wins!`;
		} else if (checkForWinner() == 3) {
			document.getElementById("turnInfo").classList.add("display-1", "text-primary");
			document.getElementById("turnInfo").innerHTML = `${oPlayer} wins!`;
		} else {
			document.getElementById("turnInfo").classList.add("display-1");
			document.getElementById("turnInfo").innerHTML = "Draw game";
		};
	};
	// TODO: Complete the function
}
 