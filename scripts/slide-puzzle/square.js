define(function () {
	var SPEED = 10;
	
	return function (x_pos, y_pos, size, font, number) {
		this.pos = {
			x: x_pos,
			y: y_pos
		};
		this.size = size;
		this.font = font;
		this.number = number;
		
		this.moving = false;
		this.direction = null;
		this.end_pos = {
			x: 0,
			y: 0
		};
		this.velocity = {
			x: 0,
			y: 0
		}
		
		this.move = function (dir) {
			this.moving = true;
			this.direction = dir;
			
			switch (dir) {
				case Direction.LEFT:
					this.end_pos.x = this.x_pos - this.size;
					this.end_pos.y = this.y_pos;
					break;
				case Direction.RIGHT:
					this.end_pos.x = this.x_pos + this.size;
					this.end_pos.y = this.y_pos;
					break;
				case Direction.UP:
					this.end_pos.y = this.y_pos - this.size;
					this.end_pos.x = this.x_pos;
					break;
				case Direction.DOWN:
					this.end_pos.y = this.y_pos + this.size;
					this.end_pos.x = this.x_pos;
					break;
			}
			
			var dx = this.end_pos.x - this.pos.x;
			this.velocity.x = (dx / Math.abs(dx)) * SPEED;
			
			var dy = this.end_pos.y - this.pos.y;
			this.velocity.y = (dy / Math.abs(dy)) * SPEED;
		}
		
		this.update = function () {
			if (this.moving) {
				var prev_pos = {
					x: this.pos.x,
					y: this.pos.y
				};
				
				this.pos.x += this.velocity.x;
				this.pos.y += this.velocity.y;
				
				var prev_diff = {
					x: this.end_pos.x - prev_pos.x,
					y: this.end_pos.y - prev_pos.y
				};
				
				var norm_prev_diff = {
					x: prev_diff.x / Math.abs(prev_diff.x),
					y: prev_diff.y / Math.abs(prev_diff.y)
				};
				
				var curr_diff = {
					x: this.end_pos.x - this.pos.x,
					y: this.end_pos.y - this.pos.y
				};
				
				var norm_curr_diff = {
					x: curr_diff.x / Math.abs(curr_diff.x),
					y: curr_diff.y / Math.abs(curr_diff.y)
				};
				
				if (norm_curr_diff.x != norm_prev_diff.x || norm_curr_diff.y != norm_prev_diff.y) {
					this.moving = false;
					this.pos = this.end_pos;
				}
			}
		};
		
		var draw = function (ctx) {
			ctx.strokeRect(this.pos.x, this.pos.y, this.size, this.size);
			
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = this.font + "px Arial";
			ctx.fillText(this.number, this.pos.x + this.size / 2, this.pos.y + this.size / 2);
		};
	};
});
