Frogger Game:
===============================
This is a simple HTML5 Canvas game built for the Udacity Front End Nanodegree. 

The logic of the game is divided in three files: app.js, engine.js, and resources.js. 

**Resources.js**: A simple image loading utility.

**Engine.js**: Game loop functionality. It draws the board, the different game assets and keeps updating the images.

**App.js**: The main logic of the gameplay. It creates classes for Enemy and for Player. It also checks for keyboard input, win conditions and screen limits.


**Playing instructions**

In the game there is a Player and Enemies (bugs). The objective is to get to the water without colliding with any bug. To move, use the arrows (up, down, left, right). After colliding with any bug, your position will be resetted. You can't go offscreen. 


**Running instructions**

To run the game, a local server needs to be running. Mac users may run it with Python running the following command: `python -m SimpleHTTPServer` and opening the local host (http://localhost:8000/) in the browser.
