
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