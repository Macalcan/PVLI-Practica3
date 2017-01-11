
Game.GameOver = function(game) {};
Game.GameOver.prototype = {
    create: function (game) {
       this.stage.backgroundColor = '#3A5963';
        var button = game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = game.add.text(400, 100, "GameOver");
        var text = game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
       
        var buttonMenu = game.add.button(200, 300, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
    },
  
};
 function actionOnClick(){
        this.game.state.start('Level1');
    }
 function actionOnClickM(){
        this.game.state.start('MainMenu');
    }

