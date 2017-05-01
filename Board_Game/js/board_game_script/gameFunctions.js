// Generates a random int
function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

// Draws the board for the game
function drawBoard (width, height, padding) {
	// Sets the canvas and context elements that we
	// will draw the board and game pieces onto
	var canvas = document.getElementById("gridcanvas");
	var context = canvas.getContext("2d");
	for (var i = 0; i <= width; i += 60) {
		context.moveTo(0.5 + i + padding, padding);
		context.lineTo(0.5 + i + padding, height + padding);
	}

	for (var i = 0; i <= height; i += 60) {
		context.moveTo(padding, 0.5 + i + padding);
		context.lineTo(width + padding, 0.5 + i + padding);
	}

	context.strokeStyle = "black";
	context.stroke();
}

// Draws all of the starting objects for the game
var startingIndexes = [];
function setStartPositions(array) {
	
	for (var i = 0; i < array.length; i++) {
		var indexNum = getRandomInt(1, 100);
		// find another index if current already exists
		while(isInArray(indexNum, startingIndexes)) {
			indexNum = getRandomInt(1, 100);
		}
		startingIndexes.push(indexNum);
		array[i].x = boardSquares[indexNum]["x"];
		array[i].y = boardSquares[indexNum]["y"];
		array[i].originalX = boardSquares[indexNum]["x"];
		array[i].originalY = boardSquares[indexNum]["y"];

		array[i].drawToBoard();
	}
}

function drawLegalMoves (player) {

	var canvas = document.getElementById("playermoves");
	var context = canvas.getContext("2d");

	context.clearRect(0, 0, 620, 620);

	var legalMoves = getLegalSquares(player.originalX, player.originalY);

	for (var i = 0; i < legalMoves.length; i++) {
		context.beginPath();
		context.rect(legalMoves[i].x, legalMoves[i].y, 60, 60);
		context.closePath();
		context.stroke();
		context.strokeStyle = "orange";
		context.lineWidth = 2;
		context.shadowBlur = 8;
		context.shadowColor = "black";
	}
}

function getLegalSquares (x, y) {
	var temp = [
		{"x" : x, "y" : y}, // TODO this index might be ok to remove
		{"x" : x, "y" : y - 60},
		{"x" : x, "y" : y - 120},
		{"x" : x, "y" : y - 180},
		{"x" : x, "y" : y + 60},
		{"x" : x, "y" : y + 120},
		{"x" : x, "y" : y + 180},
		{"x" : x - 60, "y" : y},
		{"x" : x - 120, "y" : y},
		{"x" : x - 180, "y" : y},
		{"x" : x + 60, "y" : y},
		{"x" : x + 120, "y" : y},
		{"x" : x + 180, "y" : y},
	];

	for (var i = temp.length - 1; i >= 1; i--) {

		var match = compareXY(temp[i].x, temp[i].y, gameObstacles);
		var playerPresent = compareXY(temp[i].x, temp[i].y, players);

		if (match || playerPresent || temp[i].x > 560 || temp[i].x < 0 || temp[i].y > 560 || temp[i].y < 0) {
			temp.splice(i, 1);
		}
	}
	
	return temp;
}

function getEndTurnState (x, y) {
	var temp = [
		{"x" : x, "y" : y},
		{"x" : x, "y" : y - 60},
		{"x" : x, "y" : y + 60},
		{"x" : x - 60, "y" : y},
		{"x" : x + 60, "y" : y},
	];

	checkForWeapon(x, y);

	for (var i = temp.length - 1; i >= 1; i--) {

		var playerPresent = compareXY(temp[i].x, temp[i].y, players);

		if (playerPresent) {
			alert("fight naow!");
		}
	}
}

function compareXY (compareX, compareY, array) {

	var check = false;
	for (var i = array.length - 1; i >= 0; i--) {
		if (compareX == array[i].x && compareY == array[i].y) {
			check = true;
		}
	}

	return check;
}

function checkSquare (newX, newY, array) {

	var  nextSquare = false;
	for (var i = 0; i < array.length; i++) {

		if (newX == array[i].x && newY == array[i].y) {
			nextSquare = true;
		}
	}
	
	return nextSquare;

}

function checkForWeapon (x, y) {

	var weaponFound;
	var foundIndex;
	var canvas = document.getElementById("nonplayerobjects");
	var context = canvas.getContext("2d");

	for (var i = weapons.length - 1; i >= 0; i--) {
		if (x == weapons[i].x && y == weapons[i].y) {
			weaponFound = true;
			foundIndex = i;
		}
	}

	if (weaponFound && players[currentTurn].weapon) {
		players[currentTurn].previousWeapon = players[currentTurn].weapon;
	}

	if (weaponFound) {
		context.clearRect(x, y, 60, 60);
		players[currentTurn].weapon = weapons[foundIndex];
		weapons.splice(foundIndex, 1);
	}

	if (weaponFound && players[currentTurn].previousWeapon) {
		players[currentTurn].previousWeapon.x = x;
		players[currentTurn].previousWeapon.y = y;
		weapons.push(players[currentTurn].previousWeapon);
		players[currentTurn].previousWeapon.drawToBoard();
	}
}

var currentTurn = 0;
function playerTurn () {

	drawLegalMoves(players[currentTurn]);

	document.addEventListener("keypress", function(event) {
	 	if (event.code == "KeyW" || event.code == "ArrowUp"){
		 	players[currentTurn].move("up");
		 }
		 if (event.code == "KeyA" || event.code == "ArrowLeft"){
		 	players[currentTurn].move("left");
		 }
		 if (event.code == "KeyS" || event.code == "ArrowDown"){
		 	players[currentTurn].move("down");
		 }
		 if (event.code == "KeyD" || event.code == "ArrowRight"){
		 	players[currentTurn].move("right");
		 }
		 if (event.code == "Enter") {
		 	players[currentTurn].originalX = players[currentTurn].x;
		 	players[currentTurn].originalY = players[currentTurn].y;
		 	getEndTurnState(players[currentTurn].x, players[currentTurn].y);
		 	currentTurn++;
		 	if (currentTurn >= players.length) {
		 		currentTurn = 0;
		 	}
		 	drawLegalMoves(players[currentTurn]);
		 }
	 });
}
