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

// Generate random int
function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


// Object constructor for players
function player (x, y, style) { // TODO remove x and y attributes
	this.locX = x; // TODO remove x and y attributes
	this.locY = y; // TODO remove x and y attributes
	this.style = style;
}

var player1 = new player(20, 20, "#2B26E4"); // TODO remove x and y attributes
var player2 = new player(80, 20, "#269B26"); // TODO remove x and y attributes

// Array of starting positions
var startPositions = [];
startPositions.push(player1);
startPositions.push(player2);

// Array of board positions
var gridSquares = {
	1 : {"x" : 20, "y" : 20},
	2 : {"x" : 80, "y" : 20},
	3 : "",
	4 : "",
	5 : "",
	6 : "",
	7 : "",
	8 : "",
	9 : "",
	10 : "",
	11: "",
	12 : "",
	13 : "",
	14 : "",
	15 : "",
	16 : "",
	17 : "",
	18 : "",
	19 : "",
	20 : "",
	21 : "",
	22 : "",
	23 : "",
	24 : "",
	25 : "",
	26 : "",
	27 : "",
	28 : "",
	29 : "",
	30 : "",
	31 : "",
	32 : "",
	33 : "",
	34 : "",
	35 : "",
	36 : "",
	37 : "",
	38 : "",
	39 : "",
	40 : "",
	41 : "",
	42 : "",
	43 : "",
	44 : "",
	45 : "",
	46 : "",
	47 : "",
	48 : "",
	49 : "",
	50 : "",
	51 : "",
	52 : "",
	53 : "",
	54 : "",
	55 : "",
	56 : "",
	57 : "",
	58 : "",
	59 : "",
	60 : "",
	61 : "",
	62 : "",
	63 : "",
	64 : "",
	65 : "",
	66 : "",
	67 : "",
	68 : "",
	69 : "",
	70 : "",
	71 : "",
	72 : "",
	73 : "",
	74 : "",
	75 : "",
	76 : "",
	77 : "",
	78 : "",
	79 : "",
	80 : "",
	81 : "",
	82 : "",
	83 : "",
	84 : "",
	85 : "",
	86 : "",
	87 : "",
	88 : "",
	89 : "",
	90 : "",
	91 : "",
	92 : "",
	93 : "",
	94 : "",
	95 : "",
	96 : "",
	97 : "",
	98 : "",
	99 : "",
	100 : "",
};


var startX = "";
var startY = "";
// Draw a square representing the "player"
function drawPlayer() {

	// startX = gridSquares[2]["x"];
	// startY = gridSquares[2]["y"];

	for (var i = 0; i < startPositions.length; i++) {
		var indexNum = getRandomInt(1, 2);
		alert(indexNum);
		startX = gridSquares[indexNum]["x"];
		startY = gridSquares[indexNum]["y"];

		context.beginPath();
		context.arc(startX + 20, startY + 20, 20, 0, 2 * Math.PI, false);

		// if (player == player1) {
		// 	context.rect(startX, startY, 40, 40);
		// }
		// else {
		// 	context.arc(startX + 20, startY + 20, 20, 0, 2 * Math.PI, false);
		// }

		context.closePath();
		context.fillStyle = startPositions[i].style;
		context.fill();
	}


}

drawBoard();
drawPlayer();
// drawPlayer(player2);