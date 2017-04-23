// Sets global variables for board dimensions
var gridWidth = 600;
var gridHeight = 600;
var gridPadding = 10;

drawBoard(gridWidth, gridHeight, gridPadding);

// Creates instances of all the pieces needed for the game
var player1 = new Player("#2B26E4", "circle");
var player2 = new Player("#269B26", "circle");

var obstacle1 = new Obstacle();
var obstacle2 = new Obstacle();
var obstacle3 = new Obstacle();
var obstacle4 = new Obstacle();
var obstacle5 = new Obstacle();

var weapon1 = new Weapon("#B65CA8");
var weapon2 = new Weapon("#78FF6A");
var weapon3 = new Weapon("#FFEC18");
var weapon4 = new Weapon("#76FFE4");

// Creates arrays for each object type
var players = [];
players.push(player1);
players.push(player2);

var gameObstacles = [];
gameObstacles.push(obstacle1);
gameObstacles.push(obstacle2);
gameObstacles.push(obstacle3);
gameObstacles.push(obstacle4);
gameObstacles.push(obstacle5);

var weapons = [];
weapons.push(weapon1);
weapons.push(weapon2);
weapons.push(weapon3);
weapons.push(weapon4);

setStartPositions(players);
setStartPositions(gameObstacles);
setStartPositions(weapons);

playerTurn();