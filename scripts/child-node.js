define(function () {
    return function (problem, parent, action) {
        this.state = problem.result(parent.state, action);
        this.parent = parent;
        this.action = action;
        this.pathCost = parent.pathCost + problem.stepCost(parent.state, action);
    }
})