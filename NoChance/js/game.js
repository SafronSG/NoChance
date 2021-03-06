﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    // Initialize and Start the game
    document.addEventListener("DOMContentLoaded", initialize, false);

    // THE GAME
    var scaleW = window.innerWidth / 1280;
    var scaleH = window.innerHeight / 768;
    var STONE_TIME = 100;		//ticks between bullets
    var loader;
    var assets;
    var canvas, context, stage;
    var titleImage;
    var startButtonImage;
    var stoneImage;
    var stoneImage2;
    var hallWay;
    var player;
    var startJump = false;
    var jumping = 15;
    var isPlayiung = false;

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
	            { id: "stone", src: "images/Stone.png" },
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
        //ss.getAnimation("jump").next = "run";
        player.gotoAndPlay("run");


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
                    titleImage = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 405, 110));
                    titleImage.y = 20;
                    titleImage.x = canvas.width / 2 - 202;
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
                case "stone":
                    stoneImage = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 80, 80));
                    stoneImage.y = 410;
                    stoneImage.x = canvas.width + 10;
                    stoneImage.scaleX = stoneImage.scaleY = 0.5;
                    stoneImage2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0, 0, 80, 80));
                    stoneImage2.y = 410;
                    stoneImage2.x = canvas.width + 10;
                    stoneImage2.scaleX = stoneImage2.scaleY = 0.5;
                    break;
            }
        }

        stage.addChild(startButtonImage, titleImage, hallWay, player, stoneImage, stoneImage2);

        
        stage.addEventListener("stagemousedown", handleJumpStart);
        
        createjs.Ticker.setFPS(40);
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
        }
        createjs.Ticker.setPaused(true);
        stage.update();
    }
    
    function handleJumpStart() {
        if (isPlayiung)
            startJump = true;
        else {
            startButtonImage.y = -100;
            stage.update();
            isPlayiung = true;
        }
    }

    function tick() {

        hallWay.x = (hallWay.x - 10) % 330;
        if (isPlayiung) {
            stoneImage.x = stoneImage.x - 10;
            stoneImage2.x = stoneImage2.x - 10;
        }
        if (stoneImage2.x < -40) {
            addstones();
        }
        if (startJump) {
            if (jumping > 0) {
                player.y = player.y - 5;
                jumping--;
            }
            else if (jumping<=0 && jumping>-15) {
                player.y = player.y + 5;
                jumping--;
            } else {
                startJump = false;
                jumping = 15;
            }
        }
        
        stage.update();
    }
    
    function addstones() {
        var id = getRandomInt(1, 2);
        switch (id) {
            case 1:
                stoneImage.x = stoneImage2.x = canvas.width + 10;
                break;
            case 2:
                stoneImage.x = canvas.width + 10;
                stoneImage2.x = canvas.width + 400;
                break;
            case 3:
                stoneImage.x = canvas.width + 10;
                stoneImage2.x = canvas.width + 400;
                break;
            
        default:
        }
    }
    
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})();
