Game.MainMenu = function(game) {
	// aqui van las variables globales que necesitemos
};

var titlescreen;


Game.MainMenu.prototype = {

	create: function(game) {

		var menuImage = game.add.tileSprite(0, 0, 800, 600, 'menuBackground');

		menuImage.scale.setTo(1.5,2);

		this.createButton(game, 'start', game.world.centerX, game.world.centerY + 32, 300, 100,
		function(){
			this.state.start('Level1');
		});

		this.createButton(game,'about', game.world.centerX, game.world.centerY + 192, 300, 100,
		function(){
			console.log('About');
		});

		/*titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 190, 'titlescreen');
		titlescreen.anchor.setTo(0.5, 0.5);*/

	},

	update: function(game) {

	},

	createButton: function(game, string, x, y, w, h, callback) {
		var button1 = game.add.button(x, y, string, callback, this, 2, 1, 0);

		button1. anchor.setTo (0.5, 0.5);
		button1.width = w;
		button1.height = h;

		var txt = game.add.text(button1.x, button1.y);

		txt.anchor.setTo(0.5, 0.5);

	},
}