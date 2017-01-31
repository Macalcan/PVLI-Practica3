

var credits = {
	create: function(){
		 this.stage.backgroundColor = '#3A5963';

		var goText = this.game.add.text(400, 100, "Asylum Break by Macalcan");
		goText.anchor.set(0.5);

		var member1 = this.game.add.text(400, 200, "Blanca Macazaga");
		member1.anchor.set(0.5);

		var member2 = this.game.add.text(400, 300, "Adrián Alcántara");
		member2.anchor.set(0.5);

		var member3 = this.game.add.text(400, 400, "Pablo Gómez");
		member3.anchor.set(0.5);

		var buttonMenu = this.game.add.button(100, 50, 'button', this.actionOnClickM, this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Menu");
        textMenu.anchor.set (0.5);
        buttonMenu.addChild(textMenu);
	},
		

    actionOnClickM : function(){
        this.game.state.start('menu');
    },
    
};

module.exports = credits;