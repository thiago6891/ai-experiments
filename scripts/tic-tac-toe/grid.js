define(function () {
	var Grid = function (canvas_width, canvas_height) {
		this.width = canvas_width;
		this.height = canvas_height;

		this.cell_width = canvas_width / 3;
		this.cell_height = canvas_height / 3;

		// initialize empty matrix
		this.matrix = [
			[" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "]
		];
	};

	Grid.prototype.width = 0;
	Grid.prototype.height = 0;
	Grid.prototype.matrix = [];

	Grid.prototype.update = function () { };

	Grid.prototype.draw = function (ctx) {
		this.draw_lines(ctx);
		this.draw_marks(ctx);
	};

	Grid.prototype.draw_lines = function (ctx) {
		for (var i = 1; i <= 2; i++) {
			// draw vertical lines
			ctx.beginPath();
			ctx.moveTo(i * this.cell_width, 0);
			ctx.lineTo(i * this.cell_width, this.height);
			ctx.stroke();

			// draw horizontal lines
			ctx.beginPath();
			ctx.moveTo(0, i * this.cell_height);
			ctx.lineTo(this.width, i * this.cell_height);
			ctx.stroke();
		}
	};

	Grid.prototype.draw_marks = function (ctx) {
		for (var r = 0; r < 3; r++) {
			for (var c = 0; c < 3; c++) {
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.font = this.cell_height + "px Comic Sans MS";
				ctx.fillText(
					this.matrix[r][c],
					this.cell_width * (c + 0.5),
					this.cell_height * (r + 0.5));
			}
		}
	};

	Grid.prototype.click = function (x, y, mark) {
		var coords = this.get_coords(x, y);
		return this.click_at(coords.row, coords.col, mark);
	};

	Grid.prototype.click_at = function (row, col, mark) {
		if (this.matrix[row][col] === " ") {
			this.matrix[row][col] = mark;
			return true;
		}

		return false;
	};

	// given a position (x, y) in the canvas, return
	// the row and column it's located in.
	Grid.prototype.get_coords = function (x, y) {
		return {
			row: Math.floor(y / this.cell_height),
			col: Math.floor(x / this.cell_width)
		}
	};

	Grid.prototype.has_diagonal_completed = function () {
		var d1_completed =
			this.matrix[1][1] !== " " &&
			this.matrix[0][0] == this.matrix[1][1] && 
			this.matrix[1][1] == this.matrix[2][2];
		var d2_completed =
			this.matrix[1][1] !== " " &&
			this.matrix[0][2] == this.matrix[1][1] &&
			this.matrix[1][1] == this.matrix[2][0];

		if (d1_completed || d2_completed) return true;
		return false;
	};

	Grid.prototype.has_row_completed = function () {
		for (var r = 0; r < 3; r++) {
			if (this.matrix[r][0] !== " " &&
				this.matrix[r][0] == this.matrix[r][1] &&
				this.matrix[r][1] == this.matrix[r][2]) {
				return true;
			}
		}

		return false;
	};

	Grid.prototype.has_col_completed = function () {
		for (var c = 0; c < 3; c++) {
			if (this.matrix[0][c] !== " " &&
				this.matrix[0][c] == this.matrix[1][c] &&
				this.matrix[1][c] == this.matrix[2][c]) {
				return true;
			}
		}

		return false;
	};

	return Grid;
});