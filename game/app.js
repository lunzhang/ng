var game = (function(){

  var game;
  var player;
  var platforms;
  var cursors;
  var stars;
  var score = 0;
  var scoreText;

  function start(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });
  }

  function preload() {
    game.load.image('sky', 'img/sky.png');
    game.load.image('ground', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
  }

  function create() {

  }

  function update() {

  }

  return {
    start:start
  };

})();
