requirejs.config({
	baseUrl: "../scripts",
	paths: {
		jquery: "libs/jquery-2.1.0.min"
	}
});

require(
    [
		"jquery",
		"game",
		"tic-tac-toe/grid",
		"tic-tac-toe/player"
    ],
	function ($, Game, Grid, Player) {
		$(document).ready(function () {
			var game = new Game(($("#canvas")[0]));
			var grid = new Grid($("#canvas").width(), $("#canvas").height());
			game.objs.push(grid);

			var player_1 = new Player("X", true);
			var player_2 = new Player("O", true);

			var curr_player = player_1;

			var game_over = false;

			$("#canvas").click(function (e) {
				if (!game_over) {
					var x = e.offsetX === undefined ?
						e.pageX - $("#canvas").offset().left :
						e.offsetX;
					var y = e.offsetY === undefined ?
						e.pageY - $("#canvas").offset().top :
						e.offsetY;

					if (grid.click(x, y, curr_player.mark)) {
						check_game_over();
						if (!game_over) switch_players();
					}
				}
			});

			var switch_players = function () {
				if (curr_player == player_1)
					curr_player = player_2;
				else
					curr_player = player_1;
			};

			var check_game_over = function () {
				if (grid.has_diagonal_completed() ||
					grid.has_row_completed() ||
					grid.has_col_completed())
					game_over = true;
			};
		});
	}
);