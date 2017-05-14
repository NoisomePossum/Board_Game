// constructor for generic game piece class
// to be inherited by other specific game piece classes
// gives each class the draw to board function
function GamePiece() {
}

GamePiece.prototype.drawToBoard = function () {
	// Sets the canvas and context elements that we
	// will draw the board and game pieces onto
	var canvas = this.canvas;
	var context = canvas.getContext("2d");

	if (this.dirty) {
		context.clearRect(dirtyRectangle.x, dirtyRectangle.y, dirtyRectangle.width, dirtyRectangle.height);
		this.dirty = false;
	}

	var img = document.getElementById(this.image);

	if (this.type == "player") {
		context.drawImage(img, 0, 0, 35, 35, this.x + 15, this.y + 12, 35, 35);
	}
	else if (this.type == "fence") {
		context.drawImage(img, this.x, this.y);
	}
	else {
		context.drawImage(img, this.x + 10, this.y + 10);
	}
}

// Object constructor for players
function Player (imgSource) {
	GamePiece.call(this);
	this.type = "player";
	this.canvas = document.getElementById("playercanvas");
	this.image = imgSource;
	this.weapon = null;
	this.health = 100;
}
Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

var dirtyRectangle = {
	x: "",
	y: "",
	width: "",
	height: ""
};

Player.prototype.move = function (direction) {
	var lastX = this.x;
	var lastY = this.y;

	var legalSquares = getLegalSquares(this.originalX, this.originalY);

	if (direction == "up") {
		var newCoord = this.y - 60;
		var nextSquareLegal = checkSquare(this.x, newCoord, legalSquares);
		if (nextSquareLegal) {
			this.y  = newCoord;
		}
	}
	if (direction == "left") {
		var newCoord = this.x - 60;
		var nextSquareLegal = checkSquare(newCoord, this.y, legalSquares);
		if (nextSquareLegal) {
			this.x  = newCoord;
		}
	}
	if (direction == "right") {
		var newCoord = this.x + 60;
		var nextSquareLegal = checkSquare(newCoord, this.y, legalSquares);
		if (nextSquareLegal) {
			this.x  = newCoord;
		}
	}
	if (direction == "down") {
		var newCoord = this.y + 60;
		var nextSquareLegal = checkSquare(this.x, newCoord, legalSquares);
		if (nextSquareLegal) {
			this.y  = newCoord;
		}
	}
	  if (lastX != this.x || lastY != this.y) {
	  	this.dirty = true;
	  	dirtyRectangle.x = lastX;
	  	dirtyRectangle.y = lastY;
	  	dirtyRectangle.width = 60;
	  	dirtyRectangle.height = 60;
	   }

	   if (this.dirty) {
	   	this.drawToBoard();
	   }
}

// Object constructor for obstacles
function Obstacle () {
	GamePiece.call(this);
	this.type = "fence";
	this.image = "picket_fence";
	this.canvas = document.getElementById("nonplayerobjects");
}
Obstacle.prototype = Object.create(GamePiece.prototype);
Obstacle.prototype.constructor = Obstacle;

// Object constructor for weapons
function Weapon (imgSource, type) {
	GamePiece.call(this);
	this.canvas = document.getElementById("nonplayerobjects");
	this.type = type;
	this.image = imgSource;
	switch(type) {
		case "sword":
			this.damage = 20;
			break;
		case "super-strength potion":
			this.damage = 30;
			break;
		case "magic hat":
			this.damage = 40;
			break;
		case "holy hand-grenade":
			this.damage = 60;
			break;
	}
}
Weapon.prototype = Object.create(GamePiece.prototype);
Weapon.prototype.constructor = Weapon;