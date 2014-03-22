// An action is defined just by the square, located at the 
// (x, y) position in the grid, that needs to be clicked.
define(function () {
	var Action = function (x, y) {
		this.x = x;
		this.y = y;
	}

	Action.prototype.x = 0;
	Action.prototype.y = 0;

	return Action;
});
