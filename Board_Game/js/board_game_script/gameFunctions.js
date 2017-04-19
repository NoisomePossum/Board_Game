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
		array[i].originalX = boardSquares[indexNum]["x"];
		array[i].originalY = boardSquares[indexNum]["y"];

		array[i].drawToBoard();
	}
}

function getLegalSquares (x, y) {
	return [
		{"x" : x, "y" : y},
		{"x" : x, "y" : y - 60},
		{"x" : x, "y" : y - 120},
		{"x" : x, "y" : y - 180},
		{"x" : x - 60, "y" : y},
		{"x" : x - 120, "y" : y},
		{"x" : x - 180, "y" : y},
		{"x" : x, "y" : y + 60},
		{"x" : x, "y" : y + 120},
		{"x" : x, "y" : y + 180},
		{"x" : x + 60, "y" : y},
		{"x" : x + 120, "y" : y},
		{"x" : x + 180, "y" : y},
	];
}

function checkSquare (player, newX, newY, array) {

	var  nextSquare = false;

	for (var i = 0; i < array.length; i++) {

		if (newX == array[i].x && newY == array[i].y) {
			nextSquare = true;
		}
	}
	
	return nextSquare;

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
		 	players[currentTurn].originalX = players[currentTurn].x;
		 	players[currentTurn].originalY = players[currentTurn].y;
		 	currentTurn++;
		 	if (currentTurn >= players.length) {
		 		currentTurn = 0;
		 	}
		 }
	 });
}
