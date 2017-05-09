// Sets global variables for board dimensions
var gridWidth = 600;
var gridHeight = 600;
var gridPadding = 10;

drawBoard(gridWidth, gridHeight, gridPadding);

// Creates instances of all the pieces needed for the game
var player1 = new Player("player1");
var player2 = new Player("player2");

var obstacle1 = new Obstacle();
var obstacle2 = new Obstacle();
var obstacle3 = new Obstacle();
var obstacle4 = new Obstacle();
var obstacle5 = new Obstacle();

var weapon1 = new Weapon("sword", "sword");
var weapon2 = new Weapon("super_strength_potion", "super-strength potion");
var weapon3 = new Weapon("magic_hat", "magic hat");
var weapon4 = new Weapon("holy_hand_grenade", "holy hand-grenade");

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
$("#bun_left").sprite({fps: 12, no_of_frames: 8});
$("#bun_right").sprite({fps: 12, no_of_frames: 8});