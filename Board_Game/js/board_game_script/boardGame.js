var gridWidth = 600;
var gridHeight = 600;
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

// Object constructor for players
function player (x, y, style) {
	this.locX = x;
	this.locY = y;
	this.style = style;
}

var player1 = new player(20, 20, "#2B26E4");
var player2 = new player(80, 20, "#269B26");

// alert(player2.style);

// Draw a square representing the "player"
function drawPlayer(player) {

	context.beginPath();


	if (player == player1) {
		context.rect(player.locX, player.locY, 40, 40);
	}
	else {
		context.arc(player.locX + 20, player.locY + 20, 20, 0, 2 * Math.PI, false);
	}


	context.closePath();
	context.fillStyle = player.style;
	context.fill();
}

drawBoard();
drawPlayer(player1);
drawPlayer(player2);