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
        y: this.bird.y + 100
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
var jumping;
var shooting;
var numCoins = 0;
//Scena de juego.
var Level1 = {

    //Método constructor...
  create: function () {
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

        enemy1 = new EnemyBird(0, this.game, player.x + 400, player.y - 10);

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


        this.game.input.gamepad.start();
        padXBOX = this.game.input.gamepad.pad1;
        padXBOX.addCallbacks(this, {onConnect: this.addButons});
  },
    
    //IS called one per frame.
    update: function () {
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, enemy1.bird, this.spawn);

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

        if(controls.pause.isDown){
            this.pausa();
            game.pause = true;
        }

      

        if(numCoins == 3){
            this.game.state.start('endLevel');
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
