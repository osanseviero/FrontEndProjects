/* App.js
 * The main logic of the gameplay. 
 * It creates classes for Enemy and for Player. 
 * It also checks for keyboard input, win conditions and screen limits.
 */

'use strict';

// Generic class of any object that moves (Enemies and Player)
// Parameters: sprite, a string representing the image, x, the initial x position, y, the initial y position 
var MovingObject = function(sprite, x, y) {
    // Width and height to be used in collision
    this.width = 50;
    this.height = 40;

    // Coordinates
    this.x = x;
    this.y = y;

    this.sprite = sprite
}

// Enemies our player must avoid
// Parameters: y, the initial y position and baseS, the base speed (so some enemies move faster than others)
var Enemy = function(y, baseS) {
    var sprite = 'images/enemy-bug.png';

    var x = Math.random()*500;
    MovingObject.call(this, sprite, x, y);

    // Speed of the enemy, given a base and with a random component
    this.baseS = baseS;
    this.speed = this.baseS + Math.random() * 250;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(dt !== 0) {
        this.x = this.x + dt * this.speed;
    }
    if(this.x >= 500) {
        this.x = 0
        this.speed = this.baseS + Math.random() * 250;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player user controlls
var Player = function() {
    var x = 200;
    var y = 400;
    var sprite = 'images/char-boy.png'

    MovingObject.call(this, sprite, x, y);
};

// Check if player position is out of the screen and if he won
Player.prototype.update = function() {
    // Screen limits
    if(this.x >= 500) {
        this.x = 400;
    }
    if(this.x <= 0) {
        this.x = 0;
    }
    if(this.y > 400 ) {
        this.y = 400;
    }

    // Win condition
    if(this.y <= 0) {
        this.y = 400;
        this.x = 200;
        win = true;
    }
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if(win) {
        winAnim();
    }
};

// Handles the keyboard input
Player.prototype.handleInput = function(keyCode) {
    if(keyCode === "up") {
        this.y -= 90;
    }
    if(keyCode === "down") {
        this.y += 90    ;
    }
    if(keyCode === "left") {
        this.x -= 100;
    }
    if(keyCode === "right") {
        this.x += 100;
    }
};

// Checks if the enemies collide with the players
function checkCollisions(){
    allEnemies.forEach(function(enemy) {
        if (player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.height + player.y > enemy.y) {
            player.y = 400;
            player.x = 200;
        }
    });
}

// Width of the star so it grows
var starWidth = 10;
var win = false;
var winAnim = function() {

    var image = 'images/star.png';
    ctx.drawImage(Resources.get(image), 200, 200, starWidth, starWidth);
    ctx.drawImage(Resources.get(image), 100, 200, starWidth, starWidth);
    ctx.drawImage(Resources.get(image), 300, 200, starWidth, starWidth);
    if(starWidth < 100) {
        starWidth += 1;
    }
    else {
        starWidth = 10;
        win = false;
    }
};

// Enemy initialization
var enemy1 = new Enemy(60, 450);
var enemy2 = new Enemy(140, 150);
var enemy3 = new Enemy(230, 300);
var enemy4 = new Enemy(300, 150);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();

// This listens for key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
