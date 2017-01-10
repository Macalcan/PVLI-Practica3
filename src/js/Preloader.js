Game.Preloader = function(game) {

	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload: function(){


		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5, 0.5);

		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);

		//LOAD ALL ASSETS
		this.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset', 'assets/tileset.png');

		this.load.spritesheet('player', 'assets/player.png', 24, 26);

		this.load.spritesheet('buttons', 'assets/buttons.png', 193, 71);

		this.load.image('drag', 'assets/drag.png');

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
		//Crear botones del menu de pausa.

	},

	create: function() {

		this.state.start('MainMenu');

	},


};