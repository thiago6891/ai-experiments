define(["jquery", "state", "cell"], function ($, State, Cell) {
    return function (rows, cols) {
        // this function is called when the grid is generated
        this.onGridGenerated = function () { };

        this.calculateCellSize = function (rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.hCell = Number(this.element.width) / this.cols;
            this.wCell = Number(this.element.height) / this.rows;
        };

        this.clear = function () {
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        };

        this.generate = function () {
            this.cells = [];
            for (var i = 0; i < this.cols; i++) {
                var column = [];
                for (var j = 0; j < this.rows; j++) {
                    var c = new Cell(i * this.wCell, j * this.hCell);
                    column.push(c);
                    this.ctx.strokeRect(c.x, c.y, this.wCell, this.hCell);
                }
                this.cells.push(column);
            }

            this.onGridGenerated();
        };

        this.regenerate = function (rows, cols) {
            this.clear();
            this.calculateCellSize(rows, cols);
            this.generate();
        };

        this.setOnClick = function (f) {
            this.element.onclick = f;
        };

        // this function returns the state corresponding to the mouse click position in the grid
        this.getStateForCellAt = function (xPos, yPos) {
            var x = Math.floor(xPos / this.wCell);
            var y = Math.floor(yPos / this.hCell);
            return new State(x, y);
        };

        this.highlightExploredState = function (x, y) {
            this.highlightStateColored(x, y, "#0000FF");
        };

        this.highlightFrontierState = function (x, y) {
            this.highlightStateColored(x, y, "#00FF00");
        };

        this.highlightStateColored = function (x, y, color) {
            this.ctx.fillStyle = color;
            this.highlightState(x, y);
            this.ctx.fillStyle = "#000000";
        };

        this.highlightState = function (x, y) {
            var cell = this.cells[x][y];
            this.ctx.fillRect(cell.x, cell.y, this.wCell, this.hCell);
        };

        this.element = ($("#grid"))[0];
        this.ctx = this.element.getContext("2d");
        this.cells = [];
        this.calculateCellSize(rows, cols);
    }
});