var shipObj = {
    ships: [
        { locations: [0, 0], hits: ["", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0, 0], hits: ["", "", "", ""] }
    ],
    
    flee: function(ship) {
        for (var num = 0; num < shipObj.ships[ship].hits.length; num++) {
            var facing = "";
            var numHits = 0;
            
            //checks if the first digits of the location are the same, to determine the facing of the ship
            if (shipObj.ships[ship].locations[0[0]] === shipObj.ships[ship].locations[1[0]]) {
                facing = "hor";
            } else {
                facing = "vert";
            };
            
            for (shipPart in shipObj.ships[ship].hits) {
                if (shipPart === "hit") {
                    numHits++;
                };
            };
        };
            
        if (numhits === 1) {
            var direction = "";
            var randnum = random(1, 5);

            //Chooses the direction of movment, then checks if the ship in question
            //can move in teat direction. This gives the 50% chance of fleeing
            switch (direction = "") {
                case randnum === 1:
                    if (facing === "vert") {
                        if (validMove(ship)) {
                            //??
                        };
                    };
                case randnum === 2:
                    if (facing === "hor") {
                        if (validMove(ship)) {
                            //??
                        };
                    };
                case randnum === 3:
                    if (facing === "vert") {
                        if (validMove(ship)) {
                            //??
                        };
                    };
                case randnum === 4:
                    if (facing === "hor") {
                        if (validMove(ship)) {

                        };
                    };
            };
        };
    },
    
    validMove: function(ship) {
        if (parseGuess.row < 0 || parseGuess.row >= gameBoard.boardSize || parseGuess.column < 0 || parseGuess.column >= gameBoard.boardSize) {
            return (false);
        } else if (collision(shipObj.ships[ship].locations)) {
            return (false);
        };
    }
};

var gameBoard = {
        boardSize: 8,
	numShips: shipObj.ships.length,
	shipsSunk: 0,
    
    	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip(i);
			} while (game.collision(locations));
			shipObj.ships[i].locations = locations;
		};
                
	},
        /*
         * Returns an array of ship locations.  The array should be the length
         * of the ship.
         * 
         * Ex. [14, 24, 34] for a ship of length 3
         */
	generateShip: function(ship) {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - shipObj.ships[ship].locations.length + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - shipObj.ships[ship].locations.length + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < shipObj.ships[ship].locations.length; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col );
			}
		}
                console.log(newShipLocations);
		return newShipLocations;
	}
};

var game = {
	fire: function(guess) {
		for (var i = 0; i < gameBoard.numShips; i++) {
			var ship = shipObj.ships[i];
			var index = shipObj.ships[i].locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (shipObj.ships[i].hits === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				shipObj.ships[i].hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				} else {
                                    flee(ship);
                                };
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
            var ship = ship;
		for (var i = 0; i < shipObj.ships[ship].locations.length; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

        /*
         * Loads the ship locations into the "objects" in 'ships'
         */


/*
 * Returns true if there is a collision between the ships, false otherwise
 * Accepts the array 'location' of a ship, and checks the existing ships in "ships"
 * for collisions.
 */
        collision: function(locations) {
		for (var i = 0; i < gameBoard.numShips; i++) {
			var ship = shipObj.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		 }
		return false;
	}
	
}; 


var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

}; 

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = game.fire(location);
			if (hit && game.shipsSunk === shipObj.ships.length) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
};


// helper function to parse a guess from the user

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= gameBoard.boardSize ||
		           column < 0 || column >= gameBoard.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}


// event handlers

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}


// init - called when the page has completed loading

window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	gameBoard.generateShipLocations();
}





