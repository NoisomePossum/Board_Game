// Sets global variables for board dimensions
var gridWidth = 600;
var gridHeight = 600;
var gridPadding = 10;

// Sets the canvas and context elements that we
// will draw the board and game pieces onto
var canvas = document.getElementById("gridcanvas");
var context = canvas.getContext("2d");

drawBoard(gridWidth, gridHeight, gridPadding);

var player1 = new player("#2B26E4");
var player2 = new player("#269B26");

// Array of starting positions
var startPositions = [];
startPositions.push(player1);
startPositions.push(player2);

setStartPositions();