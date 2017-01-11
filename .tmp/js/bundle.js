(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

window.onload = function () {

	var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

	var GameState = {

		preload: function() {

		},
		create: function() {

		},
		update: function() {

		}, 
	};

	game.state.add('Boot', Game.Boot);
	game.state.add('Preloader', Game.Preloader);
	game.state.add('MainMenu', Game.MainMenu);
	game.state.add('Level1', Game.Level1);
	game.state.add('PauseMenu', Game.PauseMenu);
	game.state.add('GameOver', Game.GameOver);
	game.state.start('Boot');


}
},{}]},{},[1]);
