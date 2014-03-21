define(function () {
	var Game = function (canvas) {
		this.objs = [];
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		
		setInterval(this.loop.bind(this), 17);
	};

	Game.prototype.objs = [];
	Game.prototype.canvas = null;
	Game.prototype.ctx = null;

	Game.prototype.update = function () {
	    for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].update();
	    }
	};

	Game.prototype.draw = function () {
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].draw(this.ctx);
	    }
	};

	Game.prototype.loop = function () {
	    this.update();
	    this.draw();
	};

	return Game;
});
