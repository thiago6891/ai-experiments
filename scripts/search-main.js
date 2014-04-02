requirejs.config({
    baseUrl: "../scripts",
    paths: {
        jquery: "libs/jquery-2.1.0.min"
    }
});

require(
    ["jquery", "search/state", "search/problem", "search/action", "search/grid", "search/agent"],
    function ($, State, Problem, Action, Grid, Agent) {
        var generateGrid = function () {
            init = null;
            goal = null;

            var size = Number($("#size").val());
            if (size < 2 || 500 < size) return;

            grid.regenerate(size, size);
            disableSearchButtons();
        };

        var enableSearchButtons = function () {
            $("#dfsBtn").attr("disabled", false);
            $("#bfsBtn").attr("disabled", false);
            $("#asBtn").attr("disabled", false);
        };

        var disableSearchButtons = function () {
            $("#dfsBtn").attr("disabled", true);
            $("#bfsBtn").attr("disabled", true);
            $("#asBtn").attr("disabled", true);
        };

        // this function enables the selection of the initial and goal states, when both states
        // have already been selected, the function disables state selection and enables the search
        var enableNextStateSelection = function () {
            grid.setOnClick(onGridClick);
            if (init == null) {
                $("#nextAction").text("Select Initial State.");
            } else if (goal == null) {
                $("#nextAction").text("Select Goal State.");
            } else {
                $("#nextAction").text("");
                grid.setOnClick(null);
                enableSearchButtons();
            }
        };

        // this function determines which state the user clicked, highlights
        // that state and enable selection of the next state.
        var onGridClick = function (e) {
        	var x = e.offsetX === undefined ? e.layerX : e.offsetX;
        	var y = e.offsetY === undefined ? e.layerY : e.offsetY;
            var state = grid.getStateForCellAt(x, y);
            grid.highlightState(state.x, state.y);
            if (init == null) {
                init = state;
            } else if (goal == null) {
                goal = state;
            }
            enableNextStateSelection();
        };

        // this function disables the buttons, initializes the problem and
        // returns the agent to solve the problem.
        var prepareSearch = function () {
            disableSearchButtons();
            $("#generateBtn").attr("disabled", true);
            var problem = new Problem(init, goal, grid);
            return new Agent(problem);
        };

        // the following functions create a loop of search/execute using the specified search
        // algorithm, 17ms is used as the time interval to achieve about 60fps
        var searchDFS = function (agent) {
            loop = setInterval(function () { searchAndExecute(agent, "DFS"); }, 17);
        };
        var searchBFS = function (agent) {
            loop = setInterval(function () { searchAndExecute(agent, "BFS"); }, 17);
        };
        var searchAS = function (agent) {
            loop = setInterval(function () { searchAndExecute(agent, "AS"); }, 17);
        };

        // this function have the agent expand the next node given a specif search algorithm, or
        // go to the next state when it's executing. it also stops the loop and enable the generate
        // grid button when the agent is done executing.
        var searchAndExecute = function (agent, mode) {
            if (agent.searching) {
                if (mode == "DFS") {
                    agent.expandNextNodeDFS();
                } else if (mode == "BFS") {
                    agent.expandNextNodeBFS();
                } else if (mode == "AS") {
                    agent.expandNextNodeAS();
                }
            } else if (agent.executing) {
                if (agent.seq.length != 0) {
                    var s = agent.seq.pop();
                    grid.highlightState(s.x, s.y);
                } else {
                    agent.executing = false;
                }
            } else {
                clearInterval(loop);
                $("#generateBtn").attr("disabled", false);
            }
        };

        var grid;
        var init;
        var goal;
        var loop;

        $(document).ready(function () {
            grid = new Grid(0, 0);
            grid.onGridGenerated = enableNextStateSelection;
            $("#generateBtn").click(generateGrid);
            $("#dfsBtn").click(function () {
                var agent = prepareSearch();
                searchDFS(agent);
            });
            $("#bfsBtn").click(function () {
                var agent = prepareSearch();
                searchBFS(agent);
            });
            $("#asBtn").click(function () {
                var agent = prepareSearch();
                searchAS(agent);
            });
        }
    );
});