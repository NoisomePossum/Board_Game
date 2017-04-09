// Generates a random int
function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Draws the board for the game
function drawBoard (width, height, padding) {
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
function setStartPositions() {
	var startX = "";
	var startY = "";

	for (var i = 0; i < startPositions.length; i++) {
		var indexNum = getRandomInt(1, 100);
		alert(indexNum);
		startX = boardSquares[indexNum]["x"];
		startY = boardSquares[indexNum]["y"];

		startPositions[i].drawToBoard(startX, startY);
	}
}