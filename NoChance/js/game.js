// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    // Initialize and Start the game
    document.addEventListener("DOMContentLoaded", initialize, false);

    // THE GAME
    var scaleW = window.innerWidth / 1366;
    var scaleH = window.innerHeight / 768;

    var preload;
    var canvas, context, stage;
    var titleImage, titleBitmap;
    var startButtonImage, startButtonBitmap;

    function initialize() {
	canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext("2d");

	stage = new createjs.Stage(canvas);

	preload = new createjs.PreloadJS();
        preload.onComplete = prepareGame;

	var manifest = [
            { id: "playerRun", src: "images/PlayerRun.png" },
            { id: "playerJump", src: "images/PlayerJump.png" },
	    { id: "startButton", src: "images/StartButton.png" },
            { id: "title", src: "images/Title.png" }
        ];

        preload.loadManifest(manifest);
        
    }

    function prepareGame() {

	titleImage = preload.getResult("title").result;
        titleBitmap = new createjs.Bitmap(titleImage);
        titleBitmap.y = 200;
        titleBitmap.x = 10;
        stage.addChild(titleBitmap);

	startButtonImage = preload.getResult("startButton").result;
        startButtonBitmap = new createjs.Bitmap(startButtonImage);
        startButtonBitmap.y = 300;
        startButtonBitmap.x = 10;
        stage.addChild(startButtonBitmap);

//Text
        var txt = new createjs.Text("Hello CreateJS!", "15px Arial", "#000");
        txt.y = 150;
        stage.addChild(txt);
        
        stage.update();

        startGame();
    }

    function startGame() {
        createjs.Ticker.setInterval(window.requestAnimationFrame);
        createjs.Ticker.addListener(gameLoop);
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
       stage.update();
    }

    function draw() {
        stage.update();
    }
})();
