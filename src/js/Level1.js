<<<<<<< HEAD

=======
//'use strict';

//var PauseMenu = require ('./PauseMenu.js');
>>>>>>> c4064eadf7c3191728ac2580802c7e9ddb3e7f6d

EnemyBird = function (index, game, x, y) {
	
	this.bird = game.add.sprite(x, y, 'bird');
	this.bird.anchor.setTo(0.5, 0.5);
	this.bird.name = index.toString();
	game.physics.enable(this.bird, Phaser.Physics.ARCADE);
	this.bird.body.immovable = true;
	this.bird.body.collideWorldBounds = true;
	this.bird.body.allowGravity = false;

	this.birdTween = game.add.tween(this.bird).to({
		y: this.bird.y + 100
	}, 2000, 'Linear', true, 0, 100, true);

};


var enemy1;


Game.Level1 = function(game) {};

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


var padXBOX;
var buttonA;
var buttonX;
var jumping;
var shooting;

Game.Level1.prototype = {
	

	create: function (game) {
		

		this.stage.backgroundColor = '#3A5963';

		this.physics.arcade.gravity.y = 1400;

		respawn = game.add.group();

		map = this.add.tilemap('map');

		map.addTilesetImage('tileset', 'tileset');

		layer = map.createLayer('Capa de Patrones 1');

		layer.resizeWorld();

		map.setCollisionBetween(0,3);

		map.setTileIndexCallback(7, this.getCoin, this);

		map.setTileIndexCallback(6, this.spawn, this);

		map.createFromObjects('Capa de Objetos 1', 8, '', 0, true, false, respawn);



		player = this.add.sprite(0, 0, 'player');
		player.anchor.setTo(0.5, 0.5);

		this.spawn();

		player.animations.add('idle', [0,1], 2, true);
		player.animations.add('jump', [2], 1, true);
		player.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);

		this.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.colliderWorldBounds = true;

		controls = {
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			shoot: this.input.keyboard.addKey(Phaser.Keyboard.UP),
			pause: this.input.keyboard.addKey(Phaser.Keyboard.ESC),
		};

		button = this.add.button(this.world.centerX - 95, this.world.centerY + 200, 'buttons', function(){
			console.log('pressed');
		}, this, 2, 1, 0);

		button.fixedToCamera = true;

		drag = this.add.sprite(player.x, player.y, 'drag');
		drag.anchor.setTo(0.5, 0.5);
		drag.inputEnabled = true;
		drag.input.enableDrag(true);
		this.physics.arcade.enable(drag);
		drag.body.colliderWorldBounds = true;

		enemy1 = new EnemyBird(0, game, player.x + 400, player.y - 10);

		nuts = game.add.group();
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

		
	},

	update: function() {

		this.physics.arcade.collide(player, layer);
		this.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);

		player.body.velocity.x = 0;
		
		playerLevel = Math.log(playerXP, gameXPsteps);
		console.log('Level: ' + Math.floor(playerLevel));


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
		}

		if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
			player.animations.play ('idle');
		}

		if(controls.shoot.isDown || shooting) {
			this.shootNut();

		} 

		if (checkOverlap(nuts, enemy1.bird)) {
			enemy1.bird.kill();
		}
<<<<<<< HEAD

		if(controls.pause.isDown)
		{
			 
             this.pause();

		}

			//this.game.paused = true; 
		/*if(this.input.keyboard.addKey(Phaser.Keyboard.P))
			this.game.paused = true; 
			//this.pausa();*/

=======
		if(controls.pause.isDown){
			this.pausa();
			this.game.pause = true;
		}
			
>>>>>>> c4064eadf7c3191728ac2580802c7e9ddb3e7f6d

	},

	resetPlayer: function() {

		player.reset(100, 560);
	},

	spawn: function() {

		respawn.forEach(function(spawnPoint){

			player.reset(spawnPoint.x, spawnPoint.y);

		}, this);
	},

	getCoin: function() {

		map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));

		playerXP += 15;
	},
<<<<<<< HEAD
	 
	
=======
	pausa: function(){
		PauseMenu.pause(this.game);
		//console.log('pausa');
	},
>>>>>>> c4064eadf7c3191728ac2580802c7e9ddb3e7f6d

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
          this.game.state.start('MainMenu');
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
			nut = nuts.getFirstExists(false);
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
	},


};


function checkOverlap (spriteA, spriteB) {
	
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA, boundsB);
}


//destruir todo
