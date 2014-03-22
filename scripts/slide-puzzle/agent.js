define(["slide-puzzle/node"], function (Node) {
    var Agent = function (problem) {
        this.problem = problem;
    };

    Agent.prototype.problem = null;
    Agent.prototype.seq = [];

    Agent.prototype.search = function () {
        var node = new Node();
        node.state = this.problem.initial_state;
        if (this.problem.goal_test(node.state)) {
            return this.solution(node);
        }

        var frontier = [];
        frontier.push(node);
        var explored = [];

        while (true) {
            if (frontier.length == 0) {
                return this.solution(null);
            }
            var parent= this.get_best_estimated_cost(frontier);
            explored.push(parent.state);
            var possible_actions = this.problem.actions(parent.state);
            for (var i = 0; i < possible_actions.length; i++) {
                var child = this.child_node(this.problem, parent, possible_actions[i]);
                if (!this.in_explored(explored, child.state) && !this.in_frontier(frontier, child.state)) {
                    if (this.problem.goal_test(child.state)) {
                        return this.solution(child);
                    }
                    frontier.push(child);
                }
            }
        }
    };

    Agent.prototype.solution = function (node) {
        if (node == null) {
            return false;
        }

        while (node.parent != null) {
            this.seq.push(node.action);
            node = node.parent;
        }
    };

    Agent.prototype.child_node = function (problem, parent, action) {
        var node = new Node();

        node.state = problem.result(parent.state, action);
        node.parent = parent;
        node.action = action;
        node.path_cost = parent.path_cost + problem.step_cost();

        return node;
    };

    Agent.prototype.in_explored = function (explored, state) {
        for (var i = 0; i < explored.length; i++) {
            if (explored[i].equals(state)) {
                return true;
            }
        }
        return false;
    };

    Agent.prototype.in_frontier = function (frontier, state) {
        for (var i = 0; i < frontier.length; i++) {
            if (frontier[i].state.equals(state)) {
                return true;
            }
        }
        return false;
    };

    Agent.prototype.next_action = function () {
        if (this.seq.length != 0) {
            return this.seq.pop();
        }
        return null;
    };

    Agent.prototype.get_best_estimated_cost = function (frontier) {
        var best_estimated_cost = Infinity;
        var best_idx = -1;
        for (var i = 0; i < frontier.length; i++) {
            var estimated_cost_to_goal = 0;
            for (var x = 0; x < frontier[i].state.sqrs.length; x++) {
                for (var y = 0; y < frontier[i].state.sqrs[x].length; y++) {
                    var num = frontier[i].state.sqrs[x][y];
                    if (num != "") {
                        var x_pos = (num - 1) % frontier[i].state.sqrs.length;
                        var y_pos = Math.floor((num - 1) / frontier[i].state.sqrs.length);
                        estimated_cost_to_goal += Math.abs(x_pos - x) + Math.abs(y_pos - y);
                    }
                }
            }
            if (estimated_cost_to_goal < best_estimated_cost) {
                best_estimated_cost = estimated_cost_to_goal;
                best_idx = i;
            }
        }
        return frontier.splice(best_idx, 1)[0];
    };

    return Agent;
});