// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    // Initialize and Start the game
    document.addEventListener("DOMContentLoaded", initialize, false);

    // THE GAME
    var scaleW = window.innerWidth / 1280;
    var scaleH = window.innerHeight / 768;

    var preload;
    var canvas, context, stage;
    var titleImage, titleBitmap;
    var startButtonImage, startButtonBitmap;
    var hallWay;

    function initialize() {
	canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth - 30;
        canvas.height = window.innerHeight - 30;
        context = canvas.getContext("2d");

	stage = new createjs.Stage(canvas);

	preload = new createjs.PreloadJS();
        preload.onComplete = prepareGame;

	var manifest = [
            { id: "playerRun", src: "images/PlayerRun.png" },
            { id: "playerJump", src: "images/PlayerJump.png" },
	        { id: "startButton", src: "images/StartButton.png" },
	        { id: "hallWay", src: "images/HallWay.png" },
            { id: "title", src: "images/Title.png" }
        ];

        preload.loadManifest(manifest);
        
    }

    function prepareGame() {
    
        hallWay = new createjs.Shape();
        var g = hallWay.graphics;
        g.beginBitmapFill(preload.getResult("hallWay").result);
        g.drawRect(0, 0, canvas.width + 330, 300);
        hallWay.y = 200;
        stage.addChild(hallWay);

	    titleImage = preload.getResult("title").result;
        titleBitmap = new createjs.Bitmap(titleImage);
        titleBitmap.y = 20;
        titleBitmap.x = canvas.width / 2 - 277;
        stage.addChild(titleBitmap);

	    startButtonImage = preload.getResult("startButton").result;
        startButtonBitmap = new createjs.Bitmap(startButtonImage);
        startButtonBitmap.y = canvas.height - 100;
        startButtonBitmap.x = canvas.width / 2 - 107;
        stage.addChild(startButtonBitmap);

        //debugText
        var txt = new createjs.Text(window.innerWidth + ":" + window.innerHeight, "15px Arial", "#000");
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
