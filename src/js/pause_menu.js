
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