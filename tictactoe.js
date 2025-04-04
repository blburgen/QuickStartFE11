let playerTurn = true;
let computerMoveTimeout = 0;
let difficulty = 1;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const easyNewBtn = document.getElementById("easyNewGameButton");
	easyNewBtn.addEventListener("click", newGame);

	const mediumNewBtn = document.getElementById("mediumNewGameButton");
	mediumNewBtn.addEventListener("click", () => {
		difficulty = 2;
		newGame();});

	const hardNewBtn = document.getElementById("hardNewGameButton");
	hardNewBtn.addEventListener("click", () => {
		difficulty = 3;
		newGame();});

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
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
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
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

function newGame() {
	clearTimeout(makeComputerMove);
	computerMoveTimeout = 0;
	const buttonsOn = document.getElementById("gameBoard")
	for (let i = 0; i < buttonsOn.children.length; i++) {
	   buttonsOn.children[i].innerHTML = "";
	   buttonsOn.children[i].removeAttribute("class");
	   buttonsOn.children[i].removeAttribute("disabled");
	   playerTurn = true;
	   document.getElementById("turnInfo").innerHTML = "Your turn";
	};// TODO: Complete the function
 }
 
 function boardButtonClicked(button) {
	if (playerTurn == true) {
	   button.innerHTML = "X";
	   button.setAttribute("class", "text-danger bg-secondary-subtle");
	   button.setAttribute("disabled", true);
	   switchTurn();
	};// TODO: Complete the function
 }
 
 function switchTurn() {
	if (checkForWinner() == 1) {
	   if (playerTurn == true) {
		  computerMoveTimeout = setTimeout(makeComputerMove, 1000);
		  playerTurn = !playerTurn;
		  document.getElementById("turnInfo").innerHTML = "Computer's turn";
	   } else {
		  playerTurn = !playerTurn;
		  document.getElementById("turnInfo").innerHTML = "Your turn";
	   };
	} else {
	   playerTurn = false;
	   if (checkForWinner() == 2) {
		  document.getElementById("turnInfo").innerHTML = "You win!";
	   } else if (checkForWinner() == 3) {
		  document.getElementById("turnInfo").innerHTML = "Computer wins!";
	   } else {
		  document.getElementById("turnInfo").innerHTML = "Draw game";
	   };
	};
	// TODO: Complete the function
 }
 
 function makeComputerMove() {
	const buttonsOff = document.getElementById("gameBoard");
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check to win
	if (difficulty > 1) {
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "" &&
				buttons[indices[1]].innerHTML === "O" &&
				buttons[indices[2]].innerHTML === "O") {
				
				// Found a winner spot
				buttons[indices[0]].innerHTML = "O";
				buttons[indices[0]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[0]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	// Check to win
	if(difficulty>2){
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "O" &&
				buttons[indices[1]].innerHTML === "" &&
				buttons[indices[2]].innerHTML === "O") {
				
				// Found a winner spot
				buttons[indices[1]].innerHTML = "O";
				buttons[indices[1]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[1]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	// Check to win
	if(difficulty > 1){
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "O" &&
				buttons[indices[1]].innerHTML === "O" &&
				buttons[indices[2]].innerHTML === "") {
				
				// Found a winner spot
				buttons[indices[2]].innerHTML = "O";
				buttons[indices[2]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[2]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	// Check to stop win
	if(difficulty > 1){
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "" &&
				buttons[indices[1]].innerHTML === "X" &&
				buttons[indices[2]].innerHTML === "X") {
				
				// Found a winner spot
				buttons[indices[0]].innerHTML = "O";
				buttons[indices[0]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[0]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	// Check to stop win
	if(difficulty > 2){
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "X" &&
				buttons[indices[1]].innerHTML === "" &&
				buttons[indices[2]].innerHTML === "X") {
				
				// Found a winner spot
				buttons[indices[1]].innerHTML = "O";
				buttons[indices[1]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[1]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	// Check to stop win
	if(difficulty > 1){
		for (let indices of possibilities) {
			if (buttons[indices[0]].innerHTML === "X" &&
				buttons[indices[1]].innerHTML === "X" &&
				buttons[indices[2]].innerHTML === "") {
				
				// Found a winner spot
				buttons[indices[2]].innerHTML = "O";
				buttons[indices[2]].setAttribute("class","text-primary bg-warning-subtle");
				buttons[indices[2]].setAttribute("disabled", true);
				switchTurn();
				return;
			}
		}
	}

	for (let i = 0; i < 1000; i++){
	   let randomNum = Math.floor(Math.random()*9);
	   if (buttonsOff.children[randomNum].innerHTML == ""){
		  buttonsOff.children[randomNum].innerHTML = "O";
		  buttonsOff.children[randomNum].setAttribute("class","text-primary bg-warning-subtle");
		  buttonsOff.children[randomNum].setAttribute("disabled", true);
		  switchTurn();
		  return;
	   };
	} // TODO: Complete the function
 }