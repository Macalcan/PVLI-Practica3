(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

var play_scene = require('./play_scene.js');
var gameover_scene = require('./gameover_scene.js');
var menu_scene = require('./menu_scene.js');
var pause_menu = require('./pause_menu.js');
var endLevel = require('./endLevel.js');
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
    this.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/tileset.png');

    //this.load.spritesheet('player', 'assets/player.png', 24, 26);

    this.load.spritesheet('player', 'assets/charlie_SpriteSheet.png', 24, 26);

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
    //Crear botones del menu de pausa.

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

	game.state.start('boot');
};
window.onload = function (){
  WebFont.load(wfconfig);
};

},{"./endLevel.js":1,"./gameover_scene.js":2,"./menu_scene.js":4,"./pause_menu.js":5,"./play_scene.js":6}],4:[function(require,module,exports){
var titlescreen;

var MenuScene = {
    create: function () {
        
   var menuImage = this.game.add.tileSprite(0, 0, 800, 600, 'menuBackground');

    menuImage.scale.setTo(1.5,2);

    this.createButton(this.game, 'start', this.game.world.centerX, this.game.world.centerY + 32, 300, 100,
    function(){
      this.state.start('Level1');
    });

    this.createButton(this.game,'about', this.game.world.centerX, this.game.world.centerY + 192, 300, 100,
    function(){
      console.log('About');
    });

    /*titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 190, 'titlescreen');
    titlescreen.anchor.setTo(0.5, 0.5);*/
    },
    
    createButton: function(game, string, x, y, w, h, callback) {
    var button1 = game.add.button(x, y, string, callback, this, 2, 1, 0);

    button1. anchor.setTo (0.5, 0.5);
    button1.width = w;
    button1.height = h;

    var txt = game.add.text(button1.x, button1.y);

    txt.anchor.setTo(0.5, 0.5);

  },
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){
'use strict';

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

function platformX (index, game, x, y, maxX) {
    
    this.platform = game.add.sprite(x, y, 'platform');
    this.platform.anchor.setTo(0.5, 0.5);
    //this.platform.name = index.toString();
    game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.allowGravity = false;

    this.platformTween = game.add.tween(this.platform, maxX).to({
        x: this.platform.x + maxX
    }, 2000, 'Linear', true, 0, 100, true);



};

function platformY (index, game, x, y, maxY) {
    
    this.platform = game.add.sprite(x, y, 'platform');
    this.platform.anchor.setTo(0.5, 0.5);
    this.platform.name = index.toString();
    game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.collideWorldBounds = true;
    this.platform.body.allowGravity = false;

    this.platformTween = game.add.tween(this.platform, maxY).to({
        y: this.platform.y + maxY
    }, 2000, 'Linear', true, 0, 100, true);



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
var numCoins = 0;

var platform1;
var platform2;

//Escena de juego.
var Level1 = {

    //Método constructor...
  create: function (game) {
    this.stage.backgroundColor = '#3A5963';

        this.physics.arcade.gravity.y = 1400;

        respawn = this.game.add.group();

        map = this.add.tilemap('map');

        map.addTilesetImage('tileset', 'tileset');

        layer = map.createLayer('Capa de Patrones 1');

        layer.resizeWorld();

        map.setCollisionBetween(0,3);

        map.setTileIndexCallback(7, this.getCoin, this);

        map.setTileIndexCallback(6, this.dead, this);

        map.createFromObjects('Capa de Objetos 1', 8, '', 0, true, false, respawn);

        //this.musica = this.game.add.audio('musica');
        //this.muerte = this.game.add.audio('muerte');
        //this.salto = this.game.add.audio('salto');
        //this.musica.loopFull();



        player = this.add.sprite(0, 0, 'player');
        player.anchor.setTo(0.5, 0.5);

        this.spawn();

        player.animations.add('idle', [0,1], 2, true);
        player.animations.add('jump', [10, 11, 12], 1, true);
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

        /*button = this.add.button(this.world.centerX - 95, this.world.centerY + 200, 'buttons', function(){
            console.log('pressed');
        }, this, 2, 1, 0);

        button.fixedToCamera = true;*/

        drag = this.add.sprite(player.x, player.y, 'drag');
        drag.anchor.setTo(0.5, 0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);
        this.physics.arcade.enable(drag);
        drag.body.colliderWorldBounds = true;

        enemy1 = new EnemyBird(0, this.game, player.x + 400, player.y - 250);


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

        //platform1 = new platformX(0, this.game, 200, 500, 50);

        platform1 = game.add.sprite(280, 500, 'platform');
    	platform1.anchor.setTo(0.5, 0.5);
     	this.physics.arcade.enable(platform1);
     	platform1.body.immovable = true;
    	platform1.body.collideWorldBounds = true;
    	platform1.body.allowGravity = false;

        platform2 = new platformY(0, this.game, 350, 500, 50)

        this.muelle = game.add.sprite(200,500, 'muelle');
        this.muelle.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.muelle);
        this.muelle.body.immovable = true;
        this.muelle.body.allowGravity = true;
      
  },
    move: function(platform, x, maxX){
    	if(platform.x >= maxX)
    		platform.body.velocity.x = -50;
    	else if(platform.x <= x)
    		platform.body.velocity.x = 50;
    },
    //IS called one per frame.
    update: function () {
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(this.muelle, layer);
       // this.physics.arcade.collide(this.muelle, player);

        if(this.physics.arcade.collide(this.muelle, player) 
        	&& player.body.y < this.muelle.body.y){
        	player.body.velocity.y = -800;
        	console.log("arriba");
        }

        this.physics.arcade.collide(player, enemy1.bird, this.spawn);

        this.physics.arcade.collide(player, platform1);
     
        this.move(platform1, 280, 360);
        
        this.physics.arcade.collide(player, platform2.platform);

        player.body.velocity.x = 0;
        
        playerLevel = Math.log(playerXP, gameXPsteps);
        console.log('Level: ' + Math.floor(playerLevel));

        this.movement();
         

        if (checkOverlap(nuts, enemy1.bird)) {
            enemy1.bird.kill();
            this.muerte.play();
        }

        if(controls.pause.isDown){
            this.pausa();
            game.pause = true;
        }

        
        console.log("monedas: " + numCoins);

        /*if(numCoins == 3){
            this.game.state.start('endLevel');
        }*/
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
            //this.salto.play();
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
        this.destruir;
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
        numCoins++;
       
    },

        pausa: function(){
        //this.game.state.start('pauseMenu');
        this.pause(this.game);
        
    },

    pause: function(){
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

        this.map.destroy();
        this.layer.destroy();
        this.player.destroy();
        this.enemy1.destroy();
    },

    

};

function checkOverlap (spriteA, spriteB) {
    
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

module.exports = Level1;

},{}]},{},[3]);
