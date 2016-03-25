window.onload = function () {
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FlappyPig;
(function (FlappyPig) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'angrypig', null);
            this.state.add('boot', FlappyPig.Boot, false);
            this.state.add('preload', FlappyPig.Preloader, false);
            this.state.add('menu', FlappyPig.Menu, false);
            this.state.add('play', FlappyPig.Play, false);
            this.state.add('gameover', FlappyPig.GameOver, false);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    FlappyPig.Game = Game;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Fire = (function (_super) {
        __extends(Fire, _super);
        function Fire(state, x, y, frame) {
            _super.call(this, state.game, x, y, '__missing', frame);
            this._state = state;
            this.game.physics.arcade.enableBody(this);
            this.body.allowGravity = false;
            this.body.immovable = true;
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(this.onScore, this);
            this.outOfBoundsKill = true;
        }
        Fire.prototype.onScore = function () {
            this._state.score += .5;
            this._state.updateScore();
        };
        return Fire;
    })(Phaser.Sprite);
    FlappyPig.Fire = Fire;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var FireGroup = (function (_super) {
        __extends(FireGroup, _super);
        function FireGroup(state) {
            _super.call(this, state.game);
            this._state = state;
            this.hasScored = false;
            this.generateFire();
            this.x = this.game.width;
            this.setAll('body.velocity.x', -100);
        }
        FireGroup.prototype.generateFire = function () {
            var fireH1 = this.game.rnd.integerInRange(50, 300);
            var topFire = new FlappyPig.Fire(this._state, 0, 0);
            topFire.height = fireH1;
            topFire.anchor.setTo(.5, 0);
            this.game.add.existing(topFire);
            this.add(topFire);
            var fireH2 = 570 - fireH1 - 170;
            var bottomFire = new FlappyPig.Fire(this._state, 0, 570);
            bottomFire.height = fireH2;
            bottomFire.anchor.setTo(.5, 1);
            this.game.add.existing(bottomFire);
            this.add(bottomFire);
            this.setAll('body.velocity.x', -100);
        };
        return FireGroup;
    })(Phaser.Group);
    FlappyPig.FireGroup = FireGroup;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Ground = (function (_super) {
        __extends(Ground, _super);
        function Ground(game, x, y) {
            _super.call(this, game, x, y, '__missing', 0);
            this.anchor.setTo(0, 1);
            this.game.physics.arcade.enableBody(this);
            this.body.allowGravity = false;
            this.width = this.game.width;
            this.body.immovable = true;
        }
        Ground.prototype.update = function () {
        };
        return Ground;
    })(Phaser.Sprite);
    FlappyPig.Ground = Ground;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(game) {
            _super.call(this, game);
            this.x = game.world.centerX;
            this.y = game.world.centerY;
            this.init();
        }
        Explosion.prototype.init = function () {
            this.makeParticles('particle', 1, 500, false, false);
            this.explode(10000, 10);
        };
        return Explosion;
    })(Phaser.Particles.Arcade.Emitter);
    FlappyPig.Explosion = Explosion;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Pig = (function (_super) {
        __extends(Pig, _super);
        function Pig(game, x, y) {
            _super.call(this, game, x, y, '__missing', 0);
            this.anchor.setTo(0.5, 0.5);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            this.game.physics.arcade.enableBody(this);
        }
        Pig.prototype.update = function () {
            if (this.angle < 90) {
                this.angle += 2.5;
            }
        };
        Pig.prototype.flap = function () {
            this.body.velocity.y = -200;
            this.game.add.tween(this).to({ angle: -40 }, 100).start();
        };
        Pig.prototype.forward = function () {
            this.body.velocity.x = 100;
            this.game.add.tween(this).to({ angle: -40 }, 100).start();
        };
        return Pig;
    })(Phaser.Sprite);
    FlappyPig.Pig = Pig;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.game.state.start('play', true, false);
        };
        return Boot;
    })(Phaser.State);
    FlappyPig.Boot = Boot;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.preload = function () {
            //  Set-up our preloader sprite
        };
        GameOver.prototype.create = function () {
        };
        GameOver.prototype.startMenu = function () {
        };
        return GameOver;
    })(Phaser.State);
    FlappyPig.GameOver = GameOver;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.create = function () {
        };
        Menu.prototype.fadeOut = function () {
        };
        Menu.prototype.startGame = function () {
        };
        return Menu;
    })(Phaser.State);
    FlappyPig.Menu = Menu;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
        }
        Play.prototype.create = function () {
            this.pig = new FlappyPig.Pig(this.game, this.game.world.centerX, this.game.world.centerY + 100);
            this.ground = new FlappyPig.Ground(this.game, 0, this.game.height);
            this.game.add.existing(this.pig);
            this.game.add.existing(this.ground);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 500;
            var w = this.input.keyboard.addKey(Phaser.Keyboard.W);
            w.onDown.add(this.pig.flap, this.pig);
            this.input.onDown.add(this.pig.flap, this.pig);
            this.fireGroup = new FlappyPig.FireGroup(this);
            this.fireGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateFire, this);
            this.fireGenerator.timer.start();
            this.score = 0;
            this.topScore = localStorage.getItem("topFlappyScore") ? localStorage.getItem("topFlappyScore") : 0;
            this.scoreText = this.game.add.text(10, 10, "-", {
                font: "bold 16px Arial",
                fill: "white"
            });
            this.updateScore();
        };
        Play.prototype.update = function () {
            this.game.physics.arcade.collide(this.pig, this.fireGroup, this.die, null, this);
            this.game.physics.arcade.collide(this.pig, this.ground);
            if (this.pig.y < 0) {
                this.pig.body.velocity.y = 400;
            }
        };
        Play.prototype.die = function () {
            this.topScore = Math.max(this.score, this.topScore);
            console.log(this.topScore);
            localStorage.setItem("topFlappyScore", this.topScore.toString());
            this.game.state.start("play");
        };
        Play.prototype.generateFire = function () {
            this.fireGroup.generateFire();
        };
        Play.prototype.updateScore = function () {
            this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        };
        return Play;
    })(Phaser.State);
    FlappyPig.Play = Play;
})(FlappyPig || (FlappyPig = {}));
var FlappyPig;
(function (FlappyPig) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
        };
        Preloader.prototype.create = function () {
        };
        Preloader.prototype.startMenu = function () {
        };
        return Preloader;
    })(Phaser.State);
    FlappyPig.Preloader = Preloader;
})(FlappyPig || (FlappyPig = {}));
//# sourceMappingURL=app.js.map
