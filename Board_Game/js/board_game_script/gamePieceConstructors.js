// constructor for generic game piece class
// to be inherited by other specific game piece classes
// gives each class the draw to board function
// function gamePiece() {

// }

// Object constructor for players
function player (style) {
	this.style = style;
}

player.prototype.drawToBoard = function (x, y) {
	context.beginPath();
	context.arc(x + 20, y + 20, 20, 0, 2 * Math.PI, false);

	// For making the players squares instead of circles
	// context.rect(x, y, 40, 40);
	
	context.closePath();
	context.fillStyle = this.style;
	context.fill();
}