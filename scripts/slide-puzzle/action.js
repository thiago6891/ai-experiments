// An action is defined just by the square, located at the 
// (x, y) position in the grid, that needs to be clicked.
define(function () {
	return function (x, y) {
		this.x = x;
		this.y = y;
	}
});
