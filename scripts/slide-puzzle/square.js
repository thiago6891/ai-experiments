define(["slide-puzzle/direction"], function (Direction) {
    var Square = function (x_pos, y_pos, size, font, number) {
        this.pos = {
            x: x_pos,
            y: y_pos
        };
		this.size = size;
		this.font = font;
		this.number = number;
		this.moving = false;
		this.direction = null;
		this.end_move = 0;
		this.speed = 10;
	};

    Square.prototype.pos = {
        x: 0,
        y: 0
    };
	Square.prototype.size = 0;
	Square.prototype.font = 0;
	Square.prototype.number = "";
	Square.prototype.moving = false;
	Square.prototype.direction = null;
	Square.prototype.end_move = 0;
	Square.prototype.speed = 10;

	Square.prototype.update = function () {
	    if (this.moving) {
	        switch (this.direction) {
	            case Direction.UP:
	                this.pos.y -= this.speed;
	                if (this.pos.y < this.end_move) {
	                    this.pos.y = this.end_move;
	                    this.moving = false;
	                }
	                break;
	            case Direction.DOWN:
	                this.pos.y += this.speed;
	                if (this.pos.y > this.end_move) {
	                    this.pos.y = this.end_move;
	                    this.moving = false;
	                }
	                break;
	            case Direction.RIGHT:
	                this.pos.x += this.speed;
	                if (this.pos.x > this.end_move) {
	                    this.pos.x = this.end_move;
	                    this.moving = false;
	                }
	                break;
	            case Direction.LEFT:
	                this.pos.x -= this.speed;
	                if (this.pos.x < this.end_move) {
	                    this.pos.x = this.end_move;
	                    this.moving = false;
	                }
	                break;
	        }
	    }
	};

	Square.prototype.draw = function (ctx) {
	    ctx.strokeRect(this.pos.x, this.pos.y, this.size, this.size);

	    ctx.textAlign = "center";
	    ctx.textBaseline = "middle";
	    ctx.font = this.font + "px Arial";
	    ctx.fillText(this.number, this.pos.x + this.size / 2, this.pos.y + this.size / 2);
	};

	Square.prototype.move = function (dir) {
	    this.moving = true;
	    this.direction = dir;

	    switch (this.direction) {
	        case Direction.LEFT:
	            this.end_move = this.pos.x - this.size;
	            break;
	        case Direction.RIGHT:
	            this.end_move = this.pos.x + this.size;
	            break;
	        case Direction.UP:
	            this.end_move = this.pos.y - this.size;
	            break;
	        case Direction.DOWN:
	            this.end_move = this.pos.y + this.size;
	            break;
	    }
	};

	return Square;
});
