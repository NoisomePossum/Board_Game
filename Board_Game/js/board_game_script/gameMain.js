// Sets global variables for board dimensions
var gridWidth = 600;
var gridHeight = 600;
var gridPadding = 10;

// Sets the canvas and context elements that we
// will draw the board and game pieces onto
var canvas = document.getElementById("gridcanvas");
var context = canvas.getContext("2d");

drawBoard(gridWidth, gridHeight, gridPadding);

// Creates instances of all the pieces needed for the game
var player1 = new Player("#2B26E4", "circle");
var player2 = new Player("#269B26", "circle");

var obstacle1 = new Obstacle();
var obstacle2 = new Obstacle();
var obstacle3 = new Obstacle();
var obstacle4 = new Obstacle();
var obstacle5 = new Obstacle();

// Creates an array of starting positions
var startPositions = [];
startPositions.push(player1);
startPositions.push(player2);
startPositions.push(obstacle1);
startPositions.push(obstacle2);
startPositions.push(obstacle3);
startPositions.push(obstacle4);
startPositions.push(obstacle5);

setStartPositions();