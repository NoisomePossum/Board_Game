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
function setStartPositions(array) {
	var startX = "";
	var startY = "";
	var startingIndexes = [];

	for (var i = 0; i < array.length; i++) {
		var indexNum = getRandomInt(1, 100);
		while(isInArray(indexNum, startingIndexes)) {
			indexNum = getRandomInt(1, 100);
		}
		startingIndexes.push(indexNum);
		alert(startingIndexes[i]);
		startX = boardSquares[indexNum]["x"];
		startY = boardSquares[indexNum]["y"];

		array[i].drawToBoard(startX, startY);
	}
}
