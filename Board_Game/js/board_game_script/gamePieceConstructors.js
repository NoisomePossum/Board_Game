// constructor for generic game piece class
// to be inherited by other specific game piece classes
// gives each class the draw to board function
function GamePiece(style) {
	this.style = style;
}



GamePiece.prototype.drawToBoard = function (x, y) {
	context.beginPath();
	context.arc(x + 20, y + 20, 20, 0, 2 * Math.PI, false);

	// For making the players squares instead of circles
	// context.rect(x, y, 40, 40);
	
	context.closePath();
	context.fillStyle = this.style;
	context.fill();
}

// Object constructor for players
function Player (style) {
	GamePiece.call(this);
	this.style = style;
}

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;
