define(function () {
	return function (canvas) {
		this.game_loop = function () {
			this.update();
			this.draw();
		};
		
		this.update = function () {
			for (var i = 0; i < this.objs.length; i++) {
				this.objs[i].update();
			}
		};
		
		this.draw = function () {
			for (var i = 0; i < this.objs.length; i++) {
				this.objs[i].draw(this.ctx);
			}
		};
		
		this.objs = [];
		this.ctx = canvas.getContext("2d");
		
		setInterval(this.game_loop.bind(this), 17);
	};
});
