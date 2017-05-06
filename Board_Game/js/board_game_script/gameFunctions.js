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
			startCombat();
			return true;
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
		if (currentTurn == 0) {
			document.getElementById("p1Weapon").innerHTML = players[currentTurn].weapon.type;
		}
		if (currentTurn > 0) {
			document.getElementById("p2Weapon").innerHTML = players[currentTurn].weapon.type;
		}
	}

	if (weaponFound && players[currentTurn].previousWeapon) {
		players[currentTurn].previousWeapon.x = x;
		players[currentTurn].previousWeapon.y = y;
		weapons.push(players[currentTurn].previousWeapon);
		players[currentTurn].previousWeapon.drawToBoard();
	}
}

function startCombat () {
	var modal = document.getElementById("combatWindow");
	modal.style.display = "block";
	document.getElementById("combatHeader").innerHTML = "Player " + (currentTurn + 1) + " Attack";
	if (currentTurn > 0) {
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-7");
	}
	else {
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-1");
	}
	$("#bun_left").sprite({fps: 12, no_of_frames: 8});
	$("#bun_right").sprite({fps: 12, no_of_frames: 8});
}

function playerAttack () {
	var attacker = players[currentTurn];
	var attackingPlayerNumber = (currentTurn + 1);
	var defender;
	var damage;
	var defense;

	players[currentTurn].combatStatus = "attacking";
	currentTurn++;
	if (currentTurn >= players.length) {
		currentTurn = 0;
	}

	// sets a variable for the player being attacked
	defender = players[currentTurn];

	if (attacker.weapon) {
		damage = attacker.weapon.damage;
	}
	else {
		damage = 10;
	}

	if (defender.combatStatus == "defending") {
		defense = damage / 2;
	}
	else {
		defense = 0;
	}

	defender.health -= (damage - defense);

	if (defender.health <= 0) {
		// creates a variable to identify the winner of the game
		var winner = attackingPlayerNumber;
		// end the game passing attacking player as parameter
		endGame(winner);
		return;
	}

	// if next turn is player 2's turn
	if (currentTurn > 0 && currentTurn < players.length) {
		document.getElementById("lifebar2").setAttribute("aria-valuenow", defender.health);
		document.getElementById("lifebar2").innerHTML = defender.health + "/100";
		document.getElementById("lifebar2").style.width = defender.health + "%";
		document.getElementById("cw-lifebar2").setAttribute("aria-valuenow", defender.health);
		document.getElementById("cw-lifebar2").innerHTML = defender.health + "/100";
		document.getElementById("cw-lifebar2").style.width = defender.health + "%";

		// move attack and defend buttons to the new player's side
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-7");
	}
	// if next turn is player 1's turn
	else {
		document.getElementById("lifebar1").setAttribute("aria-valuenow", defender.health);
		document.getElementById("lifebar1").innerHTML = defender.health + "/100";
		document.getElementById("lifebar1").style.width = defender.health + "%";
		document.getElementById("cw-lifebar1").setAttribute("aria-valuenow", defender.health);
		document.getElementById("cw-lifebar1").innerHTML = defender.health + "/100";
		document.getElementById("cw-lifebar1").style.width = defender.health + "%";

		// move attack and defend buttons to the new player's side
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-1");
	}
	
	document.getElementById("combatHeader").innerHTML = "Player " + (currentTurn+1) + " Attack";

}

function playerDefend () {
	players[currentTurn].combatStatus = "defending";
	currentTurn++;
	if (currentTurn >= players.length) {
		currentTurn = 0;
	}

	// if next turn is player 2's turn
	if (currentTurn > 0 && currentTurn < players.length) {
		// move attack and defend buttons to the new player's side
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-7");
	}
	// if next turn is player 1's turn
	else {
		// move attack and defend buttons to the new player's side
		document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-1");
	}
	
	document.getElementById("combatHeader").innerHTML = "Player " + (currentTurn+1) + " Attack";
}

function endGame (winner) {

	var img;

	if (winner == 1) {
		img = "bun_left";
	}
	else {
		img = "bun_right";
	}

	document.getElementById("BoardGameApp").innerHTML = 
	"<div id=\"" + img + "\"></div>\n" +
	"<div><h2>Player " + winner + " wins!</h2></div>\n" +
	"<button id=\"restartGame\" class=\"btn btn-default\" onclick=\"window.location.reload()\">Play again</button>";

	$("#" + img).sprite({fps: 12, no_of_frames: 8});

	document.getElementById("BoardGameApp").setAttribute("class", "centeredDisplay");

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
		 	var fighting = getEndTurnState(players[currentTurn].x, players[currentTurn].y);
		 	if (fighting) {
		 		return;
		 	}
		 	currentTurn++;
		 	if (currentTurn >= players.length) {
		 		currentTurn = 0;
		 	}
		 	document.getElementById("uiHeader").innerHTML = "Player " + (currentTurn + 1) + "'s turn.";
		 	drawLegalMoves(players[currentTurn]);
		 }
	 });
}
