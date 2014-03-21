define(["slide-puzzle/square", "slide-puzzle/direction"], function (Square, Direction) {
	var FONT_SCALE = 0.8;
	
	var Grid = function (cols, canvas_size) {
		this.sqr_size = canvas_size / cols;
		this.font_size = FONT_SCALE * this.sqr_size;
		
		this.sqrs = [];
		for (var i = 0; i < cols; i++) {
			var column = [];
			for (var j = 0; j < cols; j++) {
				var x_pos = i * this.sqr_size;
				var y_pos = j * this.sqr_size;
				var number = (i % cols) + (j * cols) + 1;
				column.push(new Square(x_pos, y_pos, this.sqr_size, this.font_size, number));
			}
			this.sqrs.push(column);
		}
		
		this.sqrs[cols - 1][cols - 1].pos.x = 0;
		this.sqrs[cols - 1][cols - 1].pos.y = 0;
		this.sqrs[cols - 1][cols - 1].size = 0;
		this.sqrs[cols - 1][cols - 1].font = 0;
		this.sqrs[cols - 1][cols - 1].number = "";
	};

	Grid.prototype.sqr_size = 0;
	Grid.prototype.font_size = 0;
	Grid.prototype.sqrs = [];

	Grid.prototype.update = function () {
	    for (var i = 0; i < this.sqrs.length; i++) {
	        for (var j = 0; j < this.sqrs[i].length; j++) {
	            this.sqrs[i][j].update();
	        }
	    }
	};

	Grid.prototype.draw = function (ctx) {
	    for (var i = 0; i < this.sqrs.length; i++) {
	        for (var j = 0; j < this.sqrs[i].length; j++) {
	            this.sqrs[i][j].draw(ctx);
	        }
	    }
	};

	Grid.prototype.clickable = function () {
	    for (var i = 0; i < this.sqrs.length; i++) {
	        for (var j = 0; j < this.sqrs[i].length; j++) {
	            if (this.sqrs[i][j].moving) {
	                return false;
	            }
	        }
	    }
	    return true;
	};

	Grid.prototype.click_sqr = function (x, y) {
	    if (x > 0 && this.sqrs[x - 1][y].number == "") {
	        this.sqrs[x][y].move(Direction.LEFT);

	        var blank_sqr = this.sqrs[x - 1][y];
	        this.sqrs[x - 1][y] = this.sqrs[x][y];
	        this.sqrs[x][y] = blank_sqr;
	    } else if (x < this.sqrs.length - 1 && this.sqrs[x + 1][y].number == "") {
	        this.sqrs[x][y].move(Direction.RIGHT);

	        var blank_sqr = this.sqrs[x + 1][y];
	        this.sqrs[x + 1][y] = this.sqrs[x][y];
	        this.sqrs[x][y] = blank_sqr;
	    } else if (y > 0 && this.sqrs[x][y - 1].number == "") {
	        this.sqrs[x][y].move(Direction.UP);

	        var blank_sqr = this.sqrs[x][y - 1];
	        this.sqrs[x][y - 1] = this.sqrs[x][y];
	        this.sqrs[x][y] = blank_sqr;
	    } else if (y < this.sqrs.length - 1 && this.sqrs[x][y + 1].number == "") {
	        this.sqrs[x][y].move(Direction.DOWN);

	        var blank_sqr = this.sqrs[x][y + 1];
	        this.sqrs[x][y + 1] = this.sqrs[x][y];
	        this.sqrs[x][y] = blank_sqr;
	    }
	};

	Grid.prototype.handle_click = function (x_pos, y_pos) {
	    if (this.clickable()) {
	        var x = Math.floor(x_pos / this.sqr_size);
	        var y = Math.floor(y_pos / this.sqr_size);
	        this.click_sqr(x, y);
	    }
	};

	Grid.prototype.solved = function () {
	    for (var n = 1; n < this.sqrs.length * this.sqrs.length - 1; n++) {
	        var x = (n - 1) % this.sqrs.length;
	        var y = Math.floor((n - 1) / this.sqrs.length);
	        if (this.sqrs[x][y].number != n) {
	            return false;
	        }
	    }
	    return true;
	};

	Grid.prototype.shuffle = function () {
	    var max_n = this.sqrs.length * this.sqrs.length - 1;
	    var nums = [];
	    for (var i = 1; i <= max_n; i++) {
	        nums.push(i);
	    }

	    for (var i = 0; i < this.sqrs.length; i++) {
	        for (var j = 0; j < this.sqrs[i].length; j++) {
	            if (this.sqrs[i][j].number != "") {
	                var rnd_idx = Math.floor(Math.random() * nums.length);
	                this.sqrs[i][j].number = nums[rnd_idx];
	                nums.splice(rnd_idx, 1);
	            }
	        }
	    }
	};

	return Grid;
});