// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    // Initialize and Start the game
    document.addEventListener("DOMContentLoaded", initialize, false);

    // THE GAME
    var scaleW = window.innerWidth / 1280;
    var scaleH = window.innerHeight / 768;

    var loader;
    var assets;
    var canvas, context, stage;
    var titleImage, titleBitmap;
    var startButtonImage, startButtonBitmap;
    var hallWay;
    var player;
    var runningRate = 2.5;

    function initialize() {
	    canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth - 30;
        canvas.height = window.innerHeight - 30;
        context = canvas.getContext("2d");

	    stage = new createjs.Stage(canvas);
	    assets = [];
	    var manifest = [
                { id: "playerRun", src: "images/runningGrant.png" },
	            { id: "startButton", src: "images/StartButton.png" },
	            { id: "hallWay", src: "images/HallWay.png" },
	            { id: "hallWay", src: "images/HallWay.png" },
                { id: "title", src: "images/Title.png" }
            ];

	    loader = new createjs.LoadQueue(false);
	    loader.onComplete = handleComplete;
	    loader.onFileLoad = handleFileLoad;
	    loader.loadManifest(manifest);
	    stage.autoClear = false;

	    
        
    }
    
    function handleFileLoad(event) {
        assets.push(event.item);
    }

    function handleComplete() {
    
        var spriteSheet = { "animations": { "run": [0, 25], "jump": [26, 63] }, "images": ["images/runningGrant.png"], "frames": { "regX": 0, "height": 292.5, "count": 64, "regY": 0, "width": 165.75 } };

        var ss = new createjs.SpriteSheet(spriteSheet);
        player = new createjs.BitmapAnimation(ss);

        // Set up looping
        ss.getAnimation("run").next = "run";
        ss.getAnimation("jump").next = "run";
        //player.gotoAndPlay("run");


        // Position the Grant sprite
        player.x = 100;
        player.y = 363;
        player.scaleX = player.scaleY = 0.3;
        
        
        for (var i = 0; i < assets.length; i++) {
            
            var item = assets[i];
            var id = item.id;
            var result = loader.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "title":
                    titleImage = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 553, 110));
                    titleImage.y = 20;
                    titleImage.x = canvas.width / 2 - 277;
                    break;
                case "hallWay":
                    hallWay = new createjs.Shape();
                    var g = hallWay.graphics;
                    g.beginBitmapFill(result);
                    g.drawRect(0, 0, canvas.width + 330, 300);
                    hallWay.y = 200;
                    break;
                case "startButton":
                    startButtonImage = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 213, 72));
                    startButtonImage.y = canvas.height - 100;
                    startButtonImage.x = canvas.width / 2 - 107;
                    break;
            }
        }

        stage.addChild(startButtonImage, titleImage, hallWay, player);

        
        stage.addEventListener("stagemousedown", handleJumpStart);
        
        createjs.Ticker.setFPS(40);
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
        }
        
        stage.update();
    }
    
    function handleJumpStart() {
        player.gotoAndPlay("jump");
    }

    function tick() {
        //hallWay.x = (hallWay.x - 10) % 330;
        
        stage.update();
    }
})();
