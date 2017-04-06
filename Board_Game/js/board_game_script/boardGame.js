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

// Draw a square representing the "player"
var currRectX = 40;
var currRectY = 40;
function drawPlayer(player, x, y, style) {
	currRectX = x;
	currRectY = y;
	context.beginPath();


	if (player == "player1") {
		context.rect(x, y, 40, 40);
	}
	else {
		context.arc(x + 20, y + 20, 20, 0, 2 * Math.PI, false);
	}


	context.closePath();
	context.fillStyle = style;
	context.fill();
}

drawBoard();
drawPlayer("player1", 20, 20, "#2B26E4");
drawPlayer("player2", 80, 20, "#269B26");