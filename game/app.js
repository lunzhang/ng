var game = (function(){


  function start(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });
  }


  return {
    start:start
  };

})();
