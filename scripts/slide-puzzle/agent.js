define(["slide-puzzle/node", "utils/priority-queue"], function (Node, PriorityQueue) {
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

        var frontier = new PriorityQueue();
		// the priority for this first node doesn't really matter
		// since it's the only on the queue when it's popped.
        frontier.push(node, 0);
        var explored = [];

        while (true) {
            if (frontier.length == 0) {
                return this.solution(null);
            }
        	
            var parent = frontier.pop();
            explored.push(parent.state);
            var possible_actions = this.problem.actions(parent.state);
            for (var i = 0; i < possible_actions.length; i++) {
                var child = this.child_node(this.problem, parent, possible_actions[i]);
                if (!this.in_explored(explored, child.state) && !this.in_frontier(frontier, child.state)) {
                    if (this.problem.goal_test(child.state)) {
                        return this.solution(child);
                    }

                    var estimated_cost = this.problem.estimated_cost_to_goal(child.state);
					// the priority for the queue is the negative value of the estimated cost,
					// therefore the next node to be popped will be the one that has the lower
					// estimated cost to reach the goal.
                    frontier.push(child, -estimated_cost);
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
            if (frontier[i].element.state.equals(state)) {
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

    return Agent;
});