define(["slide-puzzle/action", "slide-puzzle/state"], function (Action, State) {
	var Problem = function (initial_state) {
		this.initial_state = initial_state;
	};

    Problem.prototype.initial_state = null;

    Problem.prototype.actions = function (state) {
        var possible_actions = [];

        for (var i = 0; i < state.sqrs.length; i++) {
            for (var j = 0; j < state.sqrs[i].length; j++) {
                if (state.sqrs[i][j] === "") {
                    if (i > 0) {
                        possible_actions.push(new Action(i - 1, j));
                    }
                    if (j > 0) {
                        possible_actions.push(new Action(i, j - 1));
                    }
                    if (i < state.sqrs.length - 1) {
                        possible_actions.push(new Action(i + 1, j));
                    }
                    if (j < state.sqrs[i].length - 1) {
                        possible_actions.push(new Action(i, j + 1));
                    }
                    return possible_actions;
                }
            }
        }

        return null;
    };

    Problem.prototype.result = function (state, action) {
        var resulting_state = new State(state.sqrs.length);

        for (var i = 0; i < state.sqrs.length; i++) {
            for (var j = 0; j < state.sqrs[i].length; j++) {
                resulting_state.sqrs[i][j] = state.sqrs[i][j];
            }
        }

        if (action.x > 0 && state.sqrs[action.x - 1][action.y] === "") {
			// move left action
			resulting_state.sqrs[action.x - 1][action.y] = state.sqrs[action.x][action.y];
        } else if (action.x < state.sqrs.length - 1 && state.sqrs[action.x + 1][action.y] === "") {
			// move right action
            resulting_state.sqrs[action.x + 1][action.y] = state.sqrs[action.x][action.y];
        } else if (action.y > 0 && state.sqrs[action.x][action.y - 1] === "") {
			// move up action
            resulting_state.sqrs[action.x][action.y - 1] = state.sqrs[action.x][action.y];
        } else if (action.y < state.sqrs[action.x].length - 1 &&
				state.sqrs[action.x][action.y + 1] === "") {
			// move down action
            resulting_state.sqrs[action.x][action.y + 1] = state.sqrs[action.x][action.y];
        }
        resulting_state.sqrs[action.x][action.y] = "";

        return resulting_state;
    };

    Problem.prototype.goal_test = function (state) {
        for (var i = 0; i < state.sqrs.length; i++) {
            for (var j = 0; j < state.sqrs[i].length; j++) {
                var correct_num = (j * state.sqrs[i].length) + i + 1;
                if (correct_num == state.sqrs.length * state.sqrs[i].length) {
                    correct_num = "";
                }
                if (state.sqrs[i][j] != correct_num) {
                    return false;
                }
            }
        }
        return true;
    };

    Problem.prototype.step_cost = function () {
        return 1;
    };

	// the estimated cost is the sum of the manhattan distances of
	// each number's current position to its final position.
    Problem.prototype.estimated_cost_to_goal = function (state) {
		var est_cost = 0;
		for (var x = 0; x < state.sqrs.length; x++) {
			for (var y = 0; y < state.sqrs[x].length; y++) {
				var num = state.sqrs[x][y];
				if (num !== "") {
					var final_x_pos = (num - 1) % state.sqrs.length;
					var final_y_pos = Math.floor((num - 1) / state.sqrs.length);
					est_cost += Math.abs(final_x_pos - x) + Math.abs(final_y_pos - y);
				}
			}
		}
    };

    return Problem;
});