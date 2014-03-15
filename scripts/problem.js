define(["state", "action"], function (State, Action) {
    return function (init, goal, grid) {
        this.actions = function (s) {
            r = [];

            if (s.y > 0) {
                r.push(Action.UP);
            }
            if (s.x < this.grid.cols - 1) {
                r.push(Action.RIGHT);
            }
            if (s.y < this.grid.rows - 1) {
                r.push(Action.DOWN);
            }
            if (s.x > 0) {
                r.push(Action.LEFT);
            }

            return r;
        };

        this.result = function (s, a) {
            if (a == Action.UP) {
                return new State(s.x, s.y - 1);
            } else if (a == Action.RIGHT) {
                return new State(s.x + 1, s.y);
            } else if (a == Action.DOWN) {
                return new State(s.x, s.y + 1);
            } else if (a == Action.LEFT) {
                return new State(s.x - 1, s.y);
            }

            return null;
        };

        this.goalTest = function (s) {
            return s.equals(this.goal);
        };

        this.stepCost = function (s, a) {
            return 1;
        };

        this.initialState = init;
        this.goal = goal;
        this.grid = grid;
    }
});