// Generates a random int
function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

// Draws the board for the game
function drawBoard (width, height, padding) {
	// Sets the canvas and context elements that we
	// will draw the board and game pieces onto
	var canvas = document.getElementById("gridcanvas");
	var context = canvas.getContext("2d");
	for (var i = 0; i <= width; i += 60) {
		context.moveTo(0.5 + i + padding, padding);
		context.lineTo(0.5 + i + padding, height + padding);
	}

	for (var i = 0; i <= height; i += 60) {
		context.moveTo(padding, 0.5 + i + padding);
		context.lineTo(width + padding, 0.5 + i + padding);
	}

	context.strokeStyle = "black";
	context.stroke();
}

// Draws all of the starting objects for the game
var startingIndexes = [];
function setStartPositions(array) {
	
	for (var i = 0; i < array.length; i++) {
		var indexNum = getRandomInt(1, 100);
		while(isInArray(indexNum, startingIndexes)) {
			indexNum = getRandomInt(1, 100);
		}
		startingIndexes.push(indexNum);
		array[i].x = boardSquares[indexNum]["x"];
		array[i].y = boardSquares[indexNum]["y"];

		array[i].drawToBoard();
	}
}

function isLegalSquare (originalX, originalY, player) {
	if (player.x > (originalX + 180)) {
		return false;
	}
	if (player.x < (originalX - 180)) {
		return false;
	}
	if (player.y > (originalY + 180)) {
		return false;
	}
	if (player.y < (originalY - 180)) {
		return false;
	}
	else {
		return true;
	}
}

var currentTurn = 0;

function playerTurn () {

	document.addEventListener("keypress", function(event) {
	 	if (event.code == "KeyW" || event.code == "ArrowUp"){
		 	players[currentTurn].move("up");
		 	
		 }
		 if (event.code == "KeyA" || event.code == "ArrowLeft"){
		 	players[currentTurn].move("left");
		 }
		 if (event.code == "KeyS" || event.code == "ArrowDown"){
		 	players[currentTurn].move("down");
		 }
		 if (event.code == "KeyD" || event.code == "ArrowRight"){
		 	players[currentTurn].move("right");
		 }
		 if (event.code == "Enter") {
		 	currentTurn++;
		 	if (currentTurn >= players.length) {
		 		currentTurn = 0;
		 	}
		 }
	 });
}
