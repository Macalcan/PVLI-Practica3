(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


var credits = {
	create: function(){
		 this.stage.backgroundColor = '#3A5963';

		var goText = this.game.add.text(400, 100, "Asylum Break by Macalcan");
		goText.anchor.set(0.5);

		var member1 = this.game.add.text(400, 200, "Blanca Macazaga");
		member1.anchor.set(0.5);

		var member2 = this.game.add.text(400, 300, "Adrián Alcántara");
		member2.anchor.set(0.5);

		var member3 = this.game.add.text(400, 400, "Pablo Gómez");
		member3.anchor.set(0.5);

		var buttonMenu = this.game.add.button(100, 50, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
	},
		

    actionOnClickM : function(){
        this.game.state.start('menu');
    },
    
};

module.exports = credits;
},{}],2:[function(require,module,exports){

var endLevel = {
create: function () {
        
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "Finished Level");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var buttonMenu = this.game.add.button(200, 300, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
    },
    
   
    actionOnClick: function(){
        this.game.state.start('Level1');
    },
    actionOnClickM : function(){
        this.game.state.start('menu');
    }
};

module.exports = endLevel;
},{}],3:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var buttonMenu = this.game.add.button(200, 300, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
    },
    
    //TODO 7 declarar el callback del boton.
    actionOnClick: function(){
        this.game.state.start('Level1');
    },
    actionOnClickM : function(){
        this.game.state.start('menu');
    }
};

module.exports = GameOver;
},{}],4:[function(require,module,exports){
'use strict';

var play_scene = require('./play_scene.js');
var gameover_scene = require('./gameover_scene.js');
var menu_scene = require('./menu_scene.js');
var pause_menu = require('./pause_menu.js');
var endLevel = require('./endLevel.js');
var credits = require('./credits.js');
// The Google WebFont Loader will look for this object, so create it before loading the script.




var BootScene = {
  init: function() {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
  }, 

  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'assets/preloader_bar.png');
    this.game.load.spritesheet('button', 'assets/buttons.png', 168, 70);
    this.game.load.image('logo', 'assets/phaser.png');
  },

  create: function () {
    this.game.state.start('preloader');
    
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
    this.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/simples_pimples.png');

    //this.load.spritesheet('player', 'assets/player.png', 24, 26);

    this.load.spritesheet('player', 'assets/charlie_SpriteSheet.png', 24, 26);
    this.load.spritesheet('nurse', 'assets/nurse.png', 30, 32);

    this.load.spritesheet('buttons', 'assets/buttons.png', 193, 71);

    this.load.image('drag', 'assets/drag.png');

    this.load.image('platform', 'assets/platform.png');

    this.load.image('bird', 'assets/bird.png');

    this.load.image('nut', 'assets/nut.png');

    this.load.image('titlescreen', 'assets/titlescreen.png');

    this.load.image('menuBackground', 'assets/menuBackground.jpg');

    // botones del menu principal
    this.load.image('start', 'assets/start.png');
    this.load.image('about', 'assets/about.png');

    //botones menu pausa
    this.load.image('mainmenu', 'assets/mainmenu.png');
    this.load.image('play', 'assets/play.png');

	this.load.image('muelle', 'assets/springboardDown.png')

    this.game.load.audio('muerte', "Musica/muerte.wav");
    this.game.load.audio('musica', "Musica/musica.mp3");
    this.game.load.audio('salto', "Musica/salto.wav");
    this.game.load.audio('engranaje', 'Musica/engranaje.mp3');
    //Crear botones del menu de pausa.

    //engranajes
    this.game.load.spritesheet('engranajeD', 'assets/engranajeDorado.png', 15, 12);
    //ascensor
    this.game.load.spritesheet('ascensor', 'assets/ascensor.png', 30 , 32);
    this.load.image('door', 'assets/platformerGraphics_buildings/Tiles/doorKnob.png');
      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
      this.load.onLoadComplete.add(this.loadComplete, this);
  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
    
    
   
     loadComplete: function(){
     	this.game.state.start('menu');
     },
    
    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};
 


  function init () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');


	game.state.add('boot', BootScene);
	game.state.add('menu', menu_scene);
	game.state.add('preloader', PreloaderScene);
	game.state.add('Level1', play_scene);
	game.state.add('gameOver', gameover_scene);
  game.state.add('pauseMenu', pause_menu);
  game.state.add('endLevel', endLevel);
  game.state.add('credits', credits);
  
	game.state.start('boot');
};
window.onload = function (){
  WebFont.load(wfconfig);
};

},{"./credits.js":1,"./endLevel.js":2,"./gameover_scene.js":3,"./menu_scene.js":5,"./pause_menu.js":6,"./play_scene.js":7}],5:[function(require,module,exports){
var titlescreen;

var MenuScene = {
    create: function () {
        
   var menuImage = this.game.add.tileSprite(0, 0, 800, 600, 'menuBackground');

    menuImage.scale.setTo(1.5,2);

 var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "Asylum Break");
        var text = this.game.add.text(0, 0, "Start");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var buttonMenu = this.game.add.button(400, 400, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Credits");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
    },
    
   
    actionOnClick: function(){
        this.game.state.start('Level1');
    },
    actionOnClickM : function(){
        this.game.state.start('credits');
    }

};

module.exports = MenuScene;
},{}],6:[function(require,module,exports){

var play;
var menu;
var pauseMenu = {

	create: function(){
        //Keep on playing
        this.game.paused = true;
        this.play = this.game.add.button(this.game.camera.x + 400, this.game.camera.y + 200, 'play');
        this.play.anchor.set(0.5);

        this.play.inputEnabled = true;
        this.game.input.onDown.add(this.onClick, this);
        
   
        //Main Menu
        this.menu = this.game.add.button(this.game.camera.x + 400, this.game.camera.y + 300, 'mainmenu');
        this.menu.anchor.set(0.5);

        this.menu.inputEnabled = true;
        this.game.input.onDown.add(this.onClick, this);

  
    },
     onClick: function  (event){
      if(this.play.getBounds().contains(event.x,event.y)){
          this.unpause();
      }
      else if(this.menu.getBounds().contains(event.x,event.y)){
          this.game.paused = false;
          this.destruir;
          this.game.state.start('menu');
      }
  },
    unpause: function(){
        this.game.paused = false;
        this.destroyButtons();
        
    },

    destroyButtons: function(){
        this.play.kill();
        this.menu.kill();
    },
};

module.exports = pauseMenu;
},{}],7:[function(require,module,exports){
'use strict';

// node ./node_modules/gulp/bin/gulp run

function EnemyBird (index, game, x, y) {
    
    this.bird = game.add.sprite(x, y, 'bird');
    this.bird.anchor.setTo(0.5, 0.5);
    this.bird.name = index.toString();
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;

    this.birdTween = game.add.tween(this.bird).to({
        x: this.bird.x + 100
    }, 2000, 'Linear', true, 0, 100, true);



};

function platformX (game, x, y, maxX) {
    
    this.platform = game.add.sprite(x, y, 'platform');
    this.platform.anchor.setTo(0.5, 0.5);
    //this.platform.name = index.toString();
    game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.allowGravity = false;

    this.x = x;
    this.maxX = maxX;
    
};

function platformY (game, x, y, maxY) {
    
    this.platform = game.add.sprite(x, y, 'platform');
    this.platform.anchor.setTo(0.5, 0.5);
    //this.platform.name = index.toString();
    game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.allowGravity = false;

    this.maxY = maxY;
    this.y = y;
    
    
};



function muelle(game, x, y){
    this.muelle = game.add.sprite(x, y, 'muelle');
    this.muelle.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.muelle, Phaser.Physics.ARCADE);
    this.muelle.body.immovable = true;
    this.muelle.body.allowGravity = true;
    this.y = y;
};

function engranaje(game, x, y){
    this.engranaje = game.add.sprite(x, y, 'engranajeD');
    this.engranaje.scale.setTo(1.5,1.5);
    this.engranaje.anchor.setTo(0.5, 0.5);
    this.engranaje.animations.add('turn',  [0,1,2,3,4], 2, true);
    
    game.physics.enable(this.engranaje, Phaser.Physics.ARCADE);
    this.engranaje.body.colliderWorldBounds = true;
    this.engranaje.body.immovable = true;
    this.engranaje.body.allowGravity = false;
};

function nurse (game, x, y, maxX){
    this.nurse = game.add.sprite(x, y, 'nurse');
    this.nurse.anchor.setTo(0.5, 0.5);
    this.nurse.animations.add('walk', [0,1,2,3], 7, true);
    game.physics.enable(this.nurse, Phaser.Physics.ARCADE);
    this.nurse.body.colliderWorldBounds = true;
    this.nurse.body.immovable = true;

    this.x = x;
    this.maxX = maxX;
};

var enemy1;

var map;
var layer;

var player;
var control = {};
var playerSpeed = 300;
var jumpTimer = 0;

var button;
var button2;
var play;
var menu;
var drag;

var shootTime = 0;
var nuts;

var respawn;

var playerXP = 0;
var gameXPsteps = 15;

var playerLevel = 0;

var controls;
var padXBOX;
var buttonA;
var buttonX;
var buttonB;
var jumping;
var shooting;
var attacking;




//Escena de juego.
var Level1 = {

    //Método constructor...
  create: function (game) {
    this.stage.backgroundColor = '#3A5963';

        this.physics.arcade.gravity.y = 1400;

        respawn = this.game.add.group();

        map = this.add.tilemap('map');

        map.addTilesetImage('patrones', 'tileset');
        this.backgroundLayer = map.createLayer('BackgroundLayer');
        this.groundLayer = map.createLayer('GroundLayer');
        //plano de muerte
        this.death = map.createLayer('Death');
        this.death.visible = true;
        map.setCollisionBetween(1, 5000, true, 'Death');
        
        this.groundLayer.setScale(1,1.7);
        this.groundLayer.resizeWorld();
        this.death.setScale(1,1.7);
        this.death.resizeWorld();
        
        
        console.log(this.groundLayer);
        map.setCollisionBetween(1, 5000, true, 'GroundLayer');
        //layer = map.createLayer('Capa de Patrones 1');
        //layer = map.createLayer('GroundLayer');
        //layer.resizeWorld();

        map.setCollisionBetween(0,3);

        //map.setTileIndexCallback(7, this.getCoin, this);

        //map.setTileIndexCallback(6, this.dead, this);

        //map.createFromObjects('Capa de Objetos 1', 8, '', 0, true, false, respawn);

        this.musica = this.game.add.audio('musica');
        this.muerte = this.game.add.audio('muerte');
        this.salto = this.game.add.audio('salto');
        this.coger = this.game.add.audio('engranaje');
        this.musica.loopFull();
        this.musica.volume -= 0.5;
        
        //nurses
        this.nurses = [];

        this.n1 = new nurse(this.game, 1350, 200, 1450);
        this.nurses.push(this.n1);
        this.n2 = new nurse(this.game, 1850, 500, 1950);
        this.nurses.push(this.n2);
        this.n3 = new nurse(this.game, 1950, 500, 2100);
        this.nurses.push(this.n3);
        this.n4 = new nurse(this.game, 2200, 0, 2300);
        this.nurses.push(this.n4);
        this.n5 = new nurse(this.game, 2200, 90, 2250);
        this.nurses.push(this.n5);
        

        //ascensor
        /*this.ascensor = this.add.sprite(750, 570, 'ascensor');
        this.ascensor.anchor.setTo(0.5, 0.5);
        //this.ascensor.animations.add('walk', [0,1], 7, true);
        this.ascensor.arcade.enable(this.ascensor);
        this.ascensor.body.colliderWorldBounds = true;
        this.ascensor.body.immovable = true;*/
        this.door = this.add.sprite(3100, 500, 'door');
        this.door.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.door);
        this.door.body.colliderWorldBounds = true;
        this.door.body.immovable = true;
        
        //engranaje
        this.gears = [];

        this.e1 = new engranaje(this.game, 1590, 200);
        this.gears.push(this.e1);
        this.e2 = new engranaje(this.game, 1950, 500);
        this.gears.push(this.e2);
        this.e3 = new engranaje(this.game, 2320, 30);
        this.gears.push(this.e3);
        this.e4 = new engranaje(this.game, 2700, 30);
        this.gears.push(this.e4);
        this.e5 = new engranaje(this.game, 1250, 500);
        this.gears.push(this.e5);
        
        

        player = this.add.sprite(0, 0, 'player');
        player.anchor.setTo(0.5, 0.5);

        this.spawn();

        player.animations.add('idle', [0,1], 2, true);
        player.animations.add('jump', [0], 1, true);
        player.animations.add('run', [2, 3, 4, 5], 7, true);
        player.animations.add('attack', [6, 7, 8, 9], 7, true);


        this.physics.arcade.enable(player);

        this.camera.follow(player);
        player.body.colliderWorldBounds = true;

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            attack: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            pause: this.input.keyboard.addKey(Phaser.Keyboard.ESC),
        };

      

        /*drag = this.add.sprite(player.x, player.y, 'drag');
        drag.anchor.setTo(0.5, 0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);
        this.physics.arcade.enable(drag);
        drag.body.colliderWorldBounds = true;

        enemy1 = new EnemyBird(0, this.game, player.x + 400, player.y - 250);*/


        nuts = this.game.add.group();
        nuts.enableBody = true;
        nuts.physicsBodyType = Phaser.Physics.ARCADE;
        nuts.createMultiple(5, 'nut');
        nuts.setAll('anchor.x', 0.5);
        nuts.setAll('anchor.y', 0.5);
        nuts.setAll('scale.x', 0.5);
        nuts.setAll('scale.y', 0.5);
        nuts.setAll('outOfBoundsKill', true);
        nuts.setAll('checkWorldBounds', true);


        game.input.gamepad.start();
        padXBOX = game.input.gamepad.pad1;
        padXBOX.addCallbacks(this, {onConnect: this.addButons});

        //platforms
        this.platformsX = [];

        this.platform1 = new platformX(this.game, 1120,  400, 1200);
        this.platformsX.push(this.platform1);
        this.p3 = new platformX (this.game, 2150, 530, 2400);
        this.platformsX.push(this.p3);
        
        
        this.platformsY = [];
        this.platform2 = new platformY(this.game, 1350, 510, 400)
        this.platformsY.push(this.platform2);
        this.platform3 = new platformY(this.game, 2400, 520, 350);
        this.platformsY.push(this.platform3);
        this.platform4 = new platformY(this.game, 2190, 350, 200);
        this.platformsY.push(this.platform4);
       

        //muelle 
        this.muelles = [];

        this.muelle = new muelle (this.game, 900, 500);
        this.muelles.push(this.muelle);
        this.m1 = new muelle(this.game, 1270, 300);
        this.muelles.push(this.m1);
        this.m2 = new muelle(this.game, 2100, 90);
        this.muelles.push(this.m2);
        this.m3 = new muelle(this.game, 2465, 0);
        this.muelles.push(this.m3);
        this.m4 = new muelle(this.game, 2700, 0);
        this.muelles.push(this.m4);
        
        

      	this.engranajes = 0;
  },
  
    //IS called one per frame.
    update: function () {
        this.physics.arcade.collide(player, this.groundLayer);

        for(var i = 0; i < this.platformsY.length; i++){
            this.physics.arcade.collide(player, this.platformsY[i].platform);
            this.moveY(this.platformsY[i].platform, this.platformsY[i].y, this.platformsY[i].maxY);
        }
        
     	
        this.physics.arcade.collide(this.door, this.groundLayer);
        
        
        if(this.physics.arcade.collide(player, this.death))
            this.dead();

        for(var i = 0; i < this.gears.length; i++){
            if(this.gears[i].engranaje != null && this.physics.arcade.collide(player, this.gears[i].engranaje)){
                this.coger.play();
                this.addEngrajes(this.gears[i].engranaje);
            }
        }

        for(var i = 0; i < this.muelles.length; i++){
            this.physics.arcade.collide(this.muelles[i].muelle, this.groundLayer);
            if(this.physics.arcade.collide(this.muelles[i].muelle, player) 
        	   && player.body.y < this.muelles[i].muelle.body.y){
        	   player.body.velocity.y = -800;
                this.salto.play();
            }
        }

        //si la enfermera está viva
        for(var i = 0; i < this.nurses.length; i++){
            if(this.nurses[i].nurse != null){
                this.physics.arcade.collide(this.nurses[i].nurse, this.groundLayer);

                this.enemy(this.nurses[i].nurse, this.nurses[i].x, this.nurses[i].maxX);
                
                if(this.physics.arcade.collide(player, this.nurses[i].nurse)){
        	        if(player.body.y >= this.nurses[i].nurse.body.y){
                        this.dead();
                        console.log('die');
                    }
                    else {
                        this.nurses[i].nurse.destroy();
                        console.log('kill');
                    }
        	
                 }

            }
        }

        if(this.engranajes == 5){
            if(this.physics.arcade.collide(this.door, player)){
                this.musica.destroy();
                this.game.state.start('endLevel');
            }
        }
        

        //this.physics.arcade.collide(player, enemy1.bird, this.spawn);

      
        for(var i = 0; i < this.platformsX.length; i++){

            this.physics.arcade.collide(player, this.platformsX[i].platform);
            this.move(this.platformsX[i].platform, this.platformsX[i].x, this.platformsX[i].maxX);
           
        }
     
        
        
        

        player.body.velocity.x = 0;
        
        //playerLevel = Math.log(playerXP, gameXPsteps);
        //console.log('Level: ' + Math.floor(playerLevel));

        this.movement();
         

        /*if (checkOverlap(nuts, enemy1.bird)) {
            enemy1.bird.kill();
            this.muerte.play();
        }*/

        if(controls.pause.isDown){
            this.pausa();
            game.pause = true;
        }

        
        
    },
     move: function(platform, x, maxX){
        if(platform.x >= maxX)
            platform.body.velocity.x = -50;
        else if(platform.x <= x)
            platform.body.velocity.x = 50;
        
    },
    moveY: function(platform, y, maxY){
        if(platform.y <= maxY)
            platform.body.velocity.y = 50;
        else if(platform.y >= y)
            platform.body.velocity.y = -50;
        
    },

    addEngrajes: function(engranaje){
         engranaje.destroy();
         this.engranajes++;
    },

    enemy: function(enemy, x, maxX){
    	if(enemy.x >= maxX){
    		enemy.body.velocity.x = -50;
    		enemy.animations.play('walk');
    		enemy.scale.setTo(-1, 1);
    	}
    	else if(enemy.x <= x){
    		enemy.body.velocity.x = 50;
    		enemy.animations.play('walk');
    		enemy.scale.setTo(1, 1);
    	}
    	
    },
    
    
    movement: function(){
    	if (controls.right.isDown || (padXBOX.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || 
            padXBOX.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) {
            if (player.body.onFloor() ||player.body.touching.down)
                player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x += playerSpeed;
        }

        if (controls.left.isDown || (padXBOX.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || 
            padXBOX.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) {
            if (player.body.onFloor() ||player.body.touching.down)
                player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x -= playerSpeed;
        }

        if ((controls.up.isDown || jumping) && (player.body.onFloor() ||
            player.body.touching.down) && this.time.now > jumpTimer) {
            player.body.velocity.y = -800;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
            this.salto.play();
        }

        if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
            player.animations.play ('idle');
        }

        if(controls.shoot.isDown || shooting) {
            this.shootNut();

        }

        if((player.body.onFloor() ||
            player.body.touching.down) && controls.attack.isDown || attacking) {
            player.animations.play ('attack');

        } 
    },
    
    dead: function(){
        this.musica.destroy();
        this.game.state.start('gameOver');
    },
    spawn: function() {

        respawn.forEach(function(spawnPoint){

            player.reset(spawnPoint.x, spawnPoint.y);
            this.restaVida;

        }, this);
    },

    getCoin: function() {

        map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));

        playerXP += 15;
        
       
    },

    pausa: function(){
        //this.game.state.start('pauseMenu');
        this.pause(this.game);
        
    },

    pause: function(){
        
        this.game.paused = true;
        
        //resume button
         this.play = this.game.add.button(400, 300, 
                                          'button', 
                                          this.onClick, 
                                          this, 2, 1, 0);
        this.play.anchor.set(0.5);
        var text = this.game.add.text(0, 0, "Play");
        text.anchor.set(0.5);
        this.play.addChild(text);

       //menu button
        this.menu = this.game.add.button(400, 400, 
                                          'button', 
                                          this.onClick, 
                                          this, 2, 1, 0);
        this.menu.anchor.set(0.5);
        var text2 = this.game.add.text(0, 0, "Menu");
        text2.anchor.set(0.5);
        this.menu.addChild(text2);

        this.game.input.onDown.add(this.onClick, this);

  
    },

    actionOnClick: function () {
        this.unpause();
        this.musica.mute = false;
    },
    onClick: function  (event){
      if(this.play.getBounds().contains(event.x,event.y)){
          this.unpause();
          this.musica.mute = false;
      }
      else if(this.menu.getBounds().contains(event.x,event.y)){
          this.game.paused = false;
          this.musica.destroy();
          this.game.state.start('menu');
      }
  },
    unpause: function(){
        this.game.paused = false;
        this.destroyButtons();
        
    },

    destroyButtons: function(){
        this.play.destroy();
        this.menu.destroy();
    },
    
    shootNut: function() {
        if(this.time.now > shootTime) {
            var nut = nuts.getFirstExists(false);
            if(nut) {
                nut.reset(player.x, player.y);

                nut.body.velocity.y = -600;

                shootTime = this.time.now + 900;

                playerXP += 15;
            }
        }
    },



    addButons: function () {
        buttonA = padXBOX.getButton(Phaser.Gamepad.XBOX360_A);
        buttonX = padXBOX.getButton(Phaser.Gamepad.XBOX360_X);
        buttonB = padXBOX.getButton(Phaser.Gamepad.XBOX360_B);

        buttonA.onDown.add(function(){
            jumping = true;
        }, this);

        buttonA.onUp.add(function(){
            jumping = false;
        }, this);

        buttonX.onDown.add(function(){
            shooting = true;
        }, this);

        buttonX.onUp.add(function(){
            shooting = false;
        }, this);

        buttonB.onDown.add(function(){
            attacking = true;
        }, this);

        buttonB.onUp.add(function(){
            attacking = false;
        }, this);
    },

    destruir: function () {

        map.destroy();
        this.groundLayer.destroy();
        this.musica.mute = true;
        this.musica.destroy();
    },

    

};

function checkOverlap (spriteA, spriteB) {
    
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

module.exports = Level1;

},{}]},{},[4]);
