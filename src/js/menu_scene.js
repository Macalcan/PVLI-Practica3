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