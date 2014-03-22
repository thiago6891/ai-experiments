define(function () {
    var State = function (size) {
        this.sqrs = [];
        for (var i = 0; i < size; i++) {
            var column = [];
            for (var j = 0; j < size; j++) {
                column.push("");
            }
            this.sqrs.push(column);
        }
    };

    State.prototype.sqrs = [];

    State.prototype.equals = function (state) {
        if (this.sqrs.length != state.sqrs.length) {
            return false;
        }

        for (var i = 0; i < state.sqrs.length; i++) {
            for (var j = 0; j < state.sqrs[i].length; j++) {
                if (this.sqrs[i][j] != state.sqrs[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    return State;
});