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
			var canvas = ($("#canvas")[0]);
			var game = new Game(canvas);
			var grid;
			var agent;
			var agent_loop;
			
			var agent_play = function () {
				if (grid.clickable()) {
					var action = agent.next_action();
					if (action != null) {
						grid.click_sqr(action.x, action.y);
					} else {
						clearInterval(agent_loop);
					}
				}
			};
			
			$("#generateBtn").click(function () {
				game.objs = [];
				var cols = Number($("#size").val());
				grid = new Grid(cols, game.canvas.width);
				game.objs.push(grid);
				
				$("#shuffleBtn").attr("disabled", false);
				$("#solveBtn").attr("disabled", true);
			});
			
			$("#shuffleBtn").click(function () {
				if (grid != undefined) {
					grid.shuffle();
					$("#solveBtn").attr("disabled", false);
				}
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
			    var state = new State(grid.sqrs.length);

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
