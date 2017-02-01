'use strict';

var play_scene = require('./play_scene.js');
var gameover_scene = require('./gameover_scene.js');
var menu_scene = require('./menu_scene.js');
var pause_menu = require('./pause_menu.js');
var endLevel = require('./endLevel.js');
var levels = require('./levels.js');
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

    this.load.spritesheet('dentadura', 'assets/dentadura.png', 13.3, 15);

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
    this.game.load.spritesheet('ascensor', 'assets/ascensor.png', 145 , 140);
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
  game.state.add('levels', levels);
  
	game.state.start('boot');
};
window.onload = function (){
  WebFont.load(wfconfig);
};
