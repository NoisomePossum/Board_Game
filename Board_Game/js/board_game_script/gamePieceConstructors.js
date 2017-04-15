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

	context.beginPath();

	if (this.shape == "circle") {
		context.arc(this.x + 20, this.y + 20, 20, 0, 2 * Math.PI, false);
	}
	if (this.shape == "square") {
		context.rect(this.x, this.y, 40, 40);
	}
	
	context.closePath();
	context.fillStyle = this.style;
	context.fill();
}

// Object constructor for players
function Player (style, shape) {
	GamePiece.call(this);
	this.style = style;
	this.shape = shape;
	this.canvas = document.getElementById("playercanvas");
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
	var originalX = this.x;
	var originalY = this.y;

	if (direction == "up") {
		this.y -= 60;
	}
	if (direction == "left") {
		this.x -= 60;
	}
	if (direction == "right") {
		this.x += 60;
	}
	if (direction == "down") {
		this.y += 60;
	}
	  if (originalX != this.x || originalY != this.y) {
	  	this.dirty = true;
	  	dirtyRectangle.x = originalX;
	  	dirtyRectangle.y = originalY;
	  	dirtyRectangle.width = 40;
	  	dirtyRectangle.height = 40;
	   }

	   if (this.dirty) {
	   	this.drawToBoard();
	   }
}

// Object constructor for obstacles
function Obstacle () {
	GamePiece.call(this);
	this.style = "#000000";
	this.shape = "square";
	this.canvas = document.getElementById("nonplayerobjects");
}
Obstacle.prototype = Object.create(GamePiece.prototype);
Obstacle.prototype.constructor = Obstacle;

// Object constructor for weapons
function Weapon (style) {
	GamePiece.call(this);
	this.style = style;
	this.shape = "square";
	this.canvas = document.getElementById("nonplayerobjects");
}
Weapon.prototype = Object.create(GamePiece.prototype);
Weapon.prototype.constructor = Weapon;