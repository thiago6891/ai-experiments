define(["child-node"], function (ChildNode) {
    return function (problem) {

        // this function gets a node and add to the this.seq the sequence
        // of states passed to get from the initial state to node.
        this.solution = function (node) {
            this.seq = [];
            while (node.pathCost != 0) {
                this.seq.push(node.state);
                node = node.parent;
            }
            this.seq.push(node.state);
        };

        // this function returns true if state is in the explored region, false otherwise.
        this.inExplored = function (state) {
            for (var i = 0; i < this.explored.length; i++) {
                if (this.explored[i].equals(state)) {
                    return true;
                }
            }
            return false;
        };

        // this function returns true if state is in the frontier, false otherwise.
        this.inFrontier = function (state) {
            for (var i = 0; i < this.frontier.length; i++) {
                if (this.frontier[i].state.equals(state)) {
                    return true;
                }
            }
            return false;
        };

        // this function returns the index of the node in the frontier that's nearest to the goal
        this.getNearestToGoalIndex = function () {
            var smallestDistance = Infinity;
            var index = -1;
            var goal = this.problem.goal;

            for (var i = 0; i < this.frontier.length; i++) {
                var state = this.frontier[i].state;
                var distance = this.distanceBetween(state, goal);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    index = i;
                }
            }

            return index;
        };

        // this function calculates the distance between states a and b
        this.distanceBetween = function (a, b) {
            var x = a.x - b.x;
            var y = a.y - b.y;
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        };

        // this is the function to expand the next node using depth-first search
        this.expandNextNodeDFS = function () {
            var node = this.frontier.pop();
            this.explored.push(node.state);

            this.problem.grid.highlightExploredState(node.state.x, node.state.y);

            var actions = this.problem.actions(node.state);
            for (var i = 0; i < actions.length; i++) {
                var child = new ChildNode(this.problem, node, actions[i]);
                if (!this.inExplored(child.state) && !this.inFrontier(child.state)) {
                    if (this.problem.goalTest(child.state)) {
                        this.solution(child);
                        this.searching = false;
                        this.executing = true;
                        return;
                    }
                    this.frontier.push(child);

                    this.problem.grid.highlightFrontierState(child.state.x, child.state.y);
                }
            }
        };

        // this is the function to expand the next node using breadth-first search
        this.expandNextNodeBFS = function () {
            var node = this.frontier.shift();
            this.explored.push(node.state);

            this.problem.grid.highlightExploredState(node.state.x, node.state.y);

            var actions = this.problem.actions(node.state);
            for (var i = 0; i < actions.length; i++) {
                var child = new ChildNode(this.problem, node, actions[i]);
                if (!this.inExplored(child.state) && !this.inFrontier(child.state)) {
                    if (this.problem.goalTest(child.state)) {
                        this.solution(child);
                        this.searching = false;
                        this.executing = true;
                        return;
                    }
                    this.frontier.push(child);

                    this.problem.grid.highlightFrontierState(child.state.x, child.state.y);
                }
            }
        };

        // this is the function to expand the next node using A* search
        this.expandNextNodeAS = function () {
            var index = this.getNearestToGoalIndex();
            var node = this.frontier[index];
            this.frontier.splice(index, 1);

            this.explored.push(node.state);

            this.problem.grid.highlightExploredState(node.state.x, node.state.y);

            var actions = this.problem.actions(node.state);
            for (var i = 0; i < actions.length; i++) {
                var child = new ChildNode(this.problem, node, actions[i]);
                if (!this.inExplored(child.state) && !this.inFrontier(child.state)) {
                    if (this.problem.goalTest(child.state)) {
                        this.solution(child);
                        this.searching = false;
                        this.executing = true;
                        return;
                    }
                    this.frontier.push(child);

                    this.problem.grid.highlightFrontierState(child.state.x, child.state.y);
                }
            }
        };

        // Initializing the agent object

        this.problem = problem;
        this.seq = [];
        this.searching = true;
        this.executing = false;
        this.frontier = [];

        var node = {
            state: this.problem.initialState,
            pathCost: 0
        }
        this.frontier.push(node);

        if (this.problem.goalTest(node.state)) {
            this.solution(node);
            this.frontier.pop();
            this.searching = false;
        }

        this.explored = [];
    }
});