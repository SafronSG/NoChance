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

    function initialize() {
	    canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth - 30;
        canvas.height = window.innerHeight - 30;
        context = canvas.getContext("2d");

	    stage = new createjs.Stage(canvas);
	    assets = [];
	    var manifest = [
                { id: "playerRun", src: "images/PlayerRun.png" },
                { id: "playerJump", src: "images/PlayerJump.png" },
	            { id: "startButton", src: "images/StartButton.png" },
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
    
        var txt = new createjs.Text(assets.length, "15px Arial", "#000");
        txt.y = 150;
        stage.addChild(txt);

        stage.update();
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
                case "hill2":
                    hill2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 212, 50));
                    hill2.x = Math.random() * w;
                    hill2.scaleX = hill2.scaleY = 3;
                    hill2.y = 171;
                    break;
            }
        }

        stage.addChild(startButtonImage, titleImage, hallWay);

        stage.update();
        //stage.addEventListener("stagemousedown", handleJumpStart);
        //canvas.onclick = handleClick;
        //createjs.Ticker.setFPS(40);
        //createjs.Ticker.addEventListener("tick", tick);
        
        
    }

    function handleClick() {
        //prevent extra clicks and hide text
        canvas.onclick = null;

    }
    function handleJumpStart() {
    }

    function tick(event) {
        
        var outside = w + 20;

        hallWay.x = (hallWay.x - 15) % 330;
        
        update(event);
    }
})();
