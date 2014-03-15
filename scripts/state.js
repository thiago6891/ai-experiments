define(function () {
    return function (x, y) {
        this.x = x;
        this.y = y;
        this.equals = function (state) {
            return this.x == state.x && this.y == state.y;
        }
    }
});