// constructor for generic game piece class
// to be inherited by other specific game piece classes
// gives each class the draw to board function
function GamePiece(style, shape) {
	this.style = style;
	this.shape = shape;
}

GamePiece.prototype.drawToBoard = function (x, y, shape) {
	context.beginPath();

	if (this.shape == "circle") {
		context.arc(x + 20, y + 20, 20, 0, 2 * Math.PI, false);
	}
	if (this.shape == "square") {
		context.rect(x, y, 40, 40);
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
}

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

// Object constructor for obstacles
function Obstacle () {
	GamePiece.call(this);
	this.style = "#000000";
	this.shape = "square";
}

Obstacle.prototype = Object.create(GamePiece.prototype);
Obstacle.prototype.constructor = Obstacle;
