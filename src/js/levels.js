

var levels = {
	create: function(){
		 this.stage.backgroundColor = '#3A5963';

	

		var button = this.game.add.button(400, 100, 'button', this.onClick, this, 2, 1, 0);
        button.anchor.set(0.5);
        var text = this.game.add.text(0, 0, "Level1");
        text.anchor.set (0.5);
        button.addChild(text);

		var buttonMenu = this.game.add.button(100, 50, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
	},
		

    actionOnClickM : function(){
        this.game.state.start('menu');
    },

    onClick: function(){
    	 this.game.state.start('Level1');
    }
    
};

module.exports = levels;