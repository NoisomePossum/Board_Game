window.onload = function() {
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
            // checks if index is already used by an object
            // gets another index if this is the case
            while(isInArray(indexNum, startingIndexes)) {
                indexNum = getRandomInt(1, 100);
            }
            startingIndexes.push(indexNum);

            // define x and y coords of the object's initial position
            array[i].x = boardSquares[indexNum]["x"];
            array[i].y = boardSquares[indexNum]["y"];
            array[i].originalX = boardSquares[indexNum]["x"];
            array[i].originalY = boardSquares[indexNum]["y"];

            // draw the object using its own draw function
            array[i].drawToBoard();
        }
    }

    var currentTurn = 0;
    function playerTurn () {

        drawLegalMoves(players[currentTurn]);

        // listens for a keyboard action and then calls the player move function
        document.addEventListener("keypress", function getPlayerInput (event) {
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
            // when the player presses enter, end the turn and determine
            // what happens based on player surroundings
            if (event.code == "Enter") {
                // sets player's current pos as start pos for next turn
                players[currentTurn].originalX = players[currentTurn].x;
                players[currentTurn].originalY = players[currentTurn].y;

                // checks to see if combat has started
                // closes key listener if it has
                var fighting = getEndTurnState(players[currentTurn].x, players[currentTurn].y);
                if (fighting) {
                    document.removeEventListener("keypress", getPlayerInput);
                    return;
                }

                // increments the turn to the next player
                currentTurn++;
                if (currentTurn >= players.length) {
                    currentTurn = 0;
                }
                document.getElementById("uiHeader").innerHTML = 
                    "Player " + (currentTurn + 1) + "'s turn.";

                // redraws the set of possible moves for the new
                // current player
                drawLegalMoves(players[currentTurn]);
            }
        });
    }

    function drawLegalMoves (player) {

        var canvas = document.getElementById("playermoves");
        var context = canvas.getContext("2d");

        context.clearRect(0, 0, 620, 620);

        // gets a list of the moves that are possible for this turn
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
            {"x" : x, "y" : y},
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

        // for each position in the temp array
        for (var i = temp.length - 1; i >= 1; i--) {

            // check if the position's x and y exactly match
            // x and y of an object in gameObstacles
            var match = compareXY(temp[i].x, temp[i].y, gameObstacles);
            // check if the position's x and y exactly match
            // x and y of an object in players
            var playerPresent = compareXY(temp[i].x, temp[i].y, players);

            // if either of the above are true or if the position
            // would be beyond the edge of the board
            // remove the position from the temp array
            if (match || playerPresent || temp[i].x > 560 || temp[i].x < 0 || temp[i].y > 560 || temp[i].y < 0) {
                temp.splice(i, 1);
            }
        }

        return temp;
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

    // called by player move function to check if it's possible
    // to move to the next square before redrawing sprite
    function checkSquare (newX, newY, array) {

        var  nextSquare = false;
        for (var i = 0; i < array.length; i++) {

            if (newX == array[i].x && newY == array[i].y) {
                nextSquare = true;
            }
        }

        return nextSquare;

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

        // for each position in the temp array
        for (var i = temp.length - 1; i >= 1; i--) {

            // check if the position's x and y exactly match
            // x and y of an object in players
            var playerPresent = compareXY(temp[i].x, temp[i].y, players);

            // if another player is adjacent to the player
            // start combat and return true value
            // so that we can turn off the key listener for the board
            if (playerPresent) {
                startCombat();
                return true;
            }
        }
    }

    function checkForWeapon (x, y) {

        var weaponFound;
        var foundIndex;
        var canvas = document.getElementById("nonplayerobjects");
        var context = canvas.getContext("2d");

        // check each weapon in the game to see if it is at player's current location
        for (var i = weapons.length - 1; i >= 0; i--) {
            if (x == weapons[i].x && y == weapons[i].y) {
                weaponFound = true;
                foundIndex = i;
            }
        }

        // if the player is already carrying a weapon, make this the previous weapon
        // before picking up the new weapon
        if (weaponFound && players[currentTurn].weapon) {
            players[currentTurn].previousWeapon = players[currentTurn].weapon;
        }

        if (weaponFound) {
            // clear the square of any weapons on it
            context.clearRect(x, y, 60, 60);

            // set the new weapon as the player's current weapon
            players[currentTurn].weapon = weapons[foundIndex];

            // remove the weapon from the weapons array
            weapons.splice(foundIndex, 1);

            // set the weapon name and image under the appropriate player in the UI display
            if (currentTurn == 0) {
                document.getElementById("p1Weapon").innerHTML = players[currentTurn].weapon.type;
                document.getElementById("p1WeaponImage").setAttribute("class", players[currentTurn].weapon.image);
            }
            if (currentTurn > 0) {
                document.getElementById("p2Weapon").innerHTML = players[currentTurn].weapon.type;
                document.getElementById("p2WeaponImage").setAttribute("class", players[currentTurn].weapon.image);
            }
        }

        // if the player has a previous weapon
        if (weaponFound && players[currentTurn].previousWeapon) {

            // set previous weapon x and y to current position
            players[currentTurn].previousWeapon.x = x;
            players[currentTurn].previousWeapon.y = y;

            // put the previous weapon back into the weapons array
            weapons.push(players[currentTurn].previousWeapon);

            // draw the previous weapon onto the board
            players[currentTurn].previousWeapon.drawToBoard();
        }
    }

    function startCombat () {

        // open a modal window for the combat display
        var modal = document.getElementById("combatWindow");
        modal.style.display = "block";

        // get the current player and display it in the header
        document.getElementById("combatHeader").innerHTML = 
            "Player " + (currentTurn + 1) + " Attack";

        // set the position of the attack and defend buttons so that they are beneath current player
        if (currentTurn > 0) {
            document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-7");
        }
        else {
            document.getElementById("pAttack").setAttribute("class", "col-lg-2 col-lg-offset-1");
        }
    }

    function playerAttack () {

        // sets varable for the attacking player using current index
        var attacker = players[currentTurn];
        var attackingPlayerNumber = (currentTurn + 1);
        var defender;
        var damage;
        var defense;
        var endCombat = false;

        players[currentTurn].combatStatus = "attacking";
        currentTurn++;
        if (currentTurn >= players.length) {
            currentTurn = 0;
        }

        // sets a variable for the player being attacked
        // after index has been updated
        defender = players[currentTurn];

        // set damage equal to weapon damage or 10 for unarmed
        if (attacker.weapon) {
            damage = attacker.weapon.damage;
        }
        else {
            damage = 10;
        }

        // if the defender used "defend" last turn
        if (defender.combatStatus == "defending") {

            // defense value becomes half of attacker's damage
            // and combat ends
            defense = damage / 2;
            endCombat = true;
            players[currentTurn].combatStatus = "attacking";
        }
        else {
            // defense value is 0 if not defending
            defense = 0;
        }

        defender.health -= (damage - defense);

        if (defender.health <= 0) {
            // creates a variable to identify the winner of the game
            var winner = attackingPlayerNumber;
            // end the game passing attacking player as winner
            endGame(winner);
            return;
        }

        if (endCombat) {
            document.getElementById("combatWindow").style.display = "none";
            playerTurn();
        }

        // if next turn is player 2's turn
        if (currentTurn > 0 && currentTurn < players.length) {
            document.getElementById("p1damage-taken").innerHTML = "";
            document.getElementById("p2damage-taken").innerHTML = "Player 2 took " + (damage - defense) + " damage.";
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
            document.getElementById("p2damage-taken").innerHTML = "";
            document.getElementById("p1damage-taken").innerHTML = "Player 1 took " + (damage - defense) + " damage.";
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

        // sets player's combat status to defending
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

        // set the sprite image to the winner's character
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

        // erases the object's image before we draw it to its new position
        if (this.dirty) {
            context.clearRect(dirtyRectangle.x, dirtyRectangle.y, dirtyRectangle.width, dirtyRectangle.height);
            this.dirty = false;
        }

        var img = document.getElementById(this.image);

        if (this.type == "player") {
            context.drawImage(img, 0, 0, 35, 35, this.x + 14, this.y + 12, 35, 35);
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
    // sets the player object as a subtype of GamePiece
    Player.prototype = Object.create(GamePiece.prototype);
    Player.prototype.constructor = Player;

    var dirtyRectangle = {
        x: "",
        y: "",
        width: "",
        height: ""
    };

    // player move function
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
    // sets the obstacle object as a subtype of GamePiece
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
    // sets the weapon object as a subtype of GamePiece
    Weapon.prototype = Object.create(GamePiece.prototype);
    Weapon.prototype.constructor = Weapon;
    // Array of board positions
    var boardSquares = {
        1 : {"x" : 10, "y" : 10},
        2 : {"x" : 70, "y" : 10},
        3 : {"x" : 130, "y" : 10},
        4 : {"x" : 190, "y" : 10},
        5 : {"x" : 250, "y" : 10},
        6 : {"x" : 310, "y" : 10},
        7 : {"x" : 370, "y" : 10},
        8 : {"x" : 430, "y" : 10},
        9 : {"x" : 490, "y" : 10},
        10 : {"x" : 550, "y" : 10},
        11: {"x" : 10, "y" : 70},
        12 : {"x" : 70, "y" : 70},
        13 : {"x" : 130, "y" : 70},
        14 : {"x" : 190, "y" : 70},
        15 : {"x" : 250, "y" : 70},
        16 : {"x" : 310, "y" : 70},
        17 : {"x" : 370, "y" : 70},
        18 : {"x" : 430, "y" : 70},
        19 : {"x" : 490, "y" : 70},
        20 : {"x" : 550, "y" : 70},
        21 : {"x" : 10, "y" : 130},
        22 : {"x" : 70, "y" : 130},
        23 : {"x" : 130, "y" : 130},
        24 : {"x" : 190, "y" : 130},
        25 : {"x" : 250, "y" : 130},
        26 : {"x" : 310, "y" : 130},
        27 : {"x" : 370, "y" : 130},
        28 : {"x" : 430, "y" : 130},
        29 : {"x" : 490, "y" : 130},
        30 : {"x" : 550, "y" : 130},
        31 : {"x" : 10, "y" : 190},
        32 : {"x" : 70, "y" : 190},
        33 : {"x" : 130, "y" : 190},
        34 : {"x" : 190, "y" : 190},
        35 : {"x" : 250, "y" : 190},
        36 : {"x" : 310, "y" : 190},
        37 : {"x" : 370, "y" : 190},
        38 : {"x" : 430, "y" : 190},
        39 : {"x" : 490, "y" : 190},
        40 : {"x" : 550, "y" : 190},
        41 : {"x" : 10, "y" : 250},
        42 : {"x" : 70, "y" : 250},
        43 : {"x" : 130, "y" : 250},
        44 : {"x" : 190, "y" : 250},
        45 : {"x" : 250, "y" : 250},
        46 : {"x" : 310, "y" : 250},
        47 : {"x" : 370, "y" : 250},
        48 : {"x" : 430, "y" : 250},
        49 : {"x" : 490, "y" : 250},
        50 : {"x" : 550, "y" : 250},
        51 : {"x" : 10, "y" : 310},
        52 : {"x" : 70, "y" : 310},
        53 : {"x" : 130, "y" : 310},
        54 : {"x" : 190, "y" : 310},
        55 : {"x" : 250, "y" : 310},
        56 : {"x" : 310, "y" : 310},
        57 : {"x" : 370, "y" : 310},
        58 : {"x" : 430, "y" : 310},
        59 : {"x" : 490, "y" : 310},
        60 : {"x" : 550, "y" : 310},
        61 : {"x" : 10, "y" : 370},
        62 : {"x" : 70, "y" : 370},
        63 : {"x" : 130, "y" : 370},
        64 : {"x" : 190, "y" : 370},
        65 : {"x" : 250, "y" : 370},
        66 : {"x" : 310, "y" : 370},
        67 : {"x" : 370, "y" : 370},
        68 : {"x" : 430, "y" : 370},
        69 : {"x" : 490, "y" : 370},
        70 : {"x" : 550, "y" : 370},
        71 : {"x" : 10, "y" : 430},
        72 : {"x" : 70, "y" : 430},
        73 : {"x" : 130, "y" : 430},
        74 : {"x" : 190, "y" : 430},
        75 : {"x" : 250, "y" : 430},
        76 : {"x" : 310, "y" : 430},
        77 : {"x" : 370, "y" : 430},
        78 : {"x" : 430, "y" : 430},
        79 : {"x" : 490, "y" : 430},
        80 : {"x" : 550, "y" : 430},
        81 : {"x" : 10, "y" : 490},
        82 : {"x" : 70, "y" : 490},
        83 : {"x" : 130, "y" : 490},
        84 : {"x" : 190, "y" : 490},
        85 : {"x" : 250, "y" : 490},
        86 : {"x" : 310, "y" : 490},
        87 : {"x" : 370, "y" : 490},
        88 : {"x" : 430, "y" : 490},
        89 : {"x" : 490, "y" : 490},
        90 : {"x" : 550, "y" : 490},
        91 : {"x" : 10, "y" : 550},
        92 : {"x" : 70, "y" : 550},
        93 : {"x" : 130, "y" : 550},
        94 : {"x" : 190, "y" : 550},
        95 : {"x" : 250, "y" : 550},
        96 : {"x" : 310, "y" : 550},
        97 : {"x" : 370, "y" : 550},
        98 : {"x" : 430, "y" : 550},
        99 : {"x" : 490, "y" : 550},
        100 : {"x" : 550, "y" : 550},
    };
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
}
