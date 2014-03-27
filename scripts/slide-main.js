requirejs.config({
    baseUrl: "../scripts",
    paths: {
        jquery: "libs/jquery-2.1.0.min"
    }
});

require(
    ["jquery", "game", "slide-puzzle/grid", "slide-puzzle/state", "slide-puzzle/problem", "slide-puzzle/agent"],
	function ($, Game, Grid, State, Problem, Agent) {
		$(document).ready(function () {
			var game = new Game(($("#canvas")[0]));
			
			var grid;
			var agent;
			var agent_loop;
			
			var generate = function (side) {
			    game.objs = [];
			    grid = new Grid(side, game.canvas.width);
			    game.objs.push(grid);

			    grid.shuffle();

			    $("#solveBtn").attr("disabled", false);
			};

			// this function controls the agent's clicks on the grid.
			var agent_play = function () {
				if (grid.clickable()) {
					var action = agent.next_action();
					if (action != null) {
						grid.click_sqr(action.x, action.y);
					} else {
						clearInterval(agent_loop);
						enable_btns();
					}
				}
			};
			
			var disable_btns = function () {
				$("#solveBtn").attr("disabled", true);
				$("#generate8Btn").attr("disabled", true);
				$("#generate15Btn").attr("disabled", true);
			};

			var enable_btns = function () {
				$("#solveBtn").attr("disabled", false);
				$("#generate8Btn").attr("disabled", false);
				$("#generate15Btn").attr("disabled", false);
			};

			$("#generate8Btn").click(function () {
			    generate(3);
			});
			
			$("#generate15Btn").click(function () {
			    generate(4);
			});
			
			$("#canvas").click(function (e) {
				if (grid != undefined) {
					grid.handle_click(e.offsetX, e.offsetY);
					if (grid.solved()) {
						$("#solveBtn").attr("disabled", true);
					}
				}
			});
			
			$("#solveBtn").click(function () {
				disable_btns();

			    var state = new State(grid.sqrs.length);

				// set the initial state
			    for (var i = 0; i < state.sqrs.length; i++) {
			        for (var j = 0; j < state.sqrs[i].length; j++) {
			            state.sqrs[i][j] = grid.sqrs[i][j].number;
			        }
			    }

				var problem = new Problem(state);
				agent = new Agent(problem);
				agent.search();
				agent_loop = setInterval(agent_play, 17);
			});
		});
	}
);
