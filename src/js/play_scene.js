'use strict';

// node ./node_modules/gulp/bin/gulp run



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
var nut;

var time = 2;


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
        this.death.visible = false;
        map.setCollisionBetween(1, 5000, true, 'Death');
        
        this.groundLayer.setScale(1,1.7);
        this.groundLayer.resizeWorld();
        this.death.setScale(1,1.7);
        this.death.resizeWorld();
        
        this.text = this.game.add.text(100, 400, "Jump and shoot nurses to defend yourself");
        
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
        
        

        player = this.add.sprite(50, 50, 'player');
        player.anchor.setTo(0.5, 0.5);

       // this.spawn();

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
        nuts.createMultiple(5, 'dentadura');
       
        nuts.setAll('anchor.x', 0.5);
        nuts.setAll('anchor.y', 0.5);
        nuts.setAll('scale.x', 1.5);
        nuts.setAll('scale.y', 1.5);
        nuts.setAll('outOfBoundsKill', true);
        nuts.setAll('checkWorldBounds', true);
        nuts.setAll('body.allowGravity', true);


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
            this.gears[i].engranaje.animations.play('turn');
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
                if(this.physics.arcade.collide(this.nurses[i].nurse, nuts)){
                    this.nurses[i].nurse.destroy();
                    nut.destroy();

                }
                
                
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
        
        

        this.movement();
         

        

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
            if (player.body.onFloor() || player.body.touching.down)
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
            player.body.velocity.y = -420;
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
            nut = nuts.getFirstExists(false);
            if(nut) {
                nut.reset(player.x, player.y);
                nut.body.velocity.x = 800;
                

                shootTime = this.time.now + 900;

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
