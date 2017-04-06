var gridWidth = 480;
var gridHeight = 480;
var gridPadding = 10;

var canvas = document.getElementById("gridcanvas");
var context = canvas.getContext("2d");

// Draw the board for the game
function drawBoard () {
	for (var i = 0; i <= gridWidth; i += 60) {
		context.moveTo(0.5 + i + gridPadding, gridPadding);
		context.lineTo(0.5 + i + gridPadding, gridHeight + gridPadding);
	}

	for (var i = 0; i <= gridHeight; i += 60) {
		context.moveTo(gridPadding, 0.5 + i + gridPadding);
		context.lineTo(gridWidth + gridPadding, 0.5 + i + gridPadding);
	}

	context.strokeStyle = "black";
	context.stroke();
}

drawBoard();