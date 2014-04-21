define(function () {
	var Player = function (mark, human) {
		this.mark = mark;
		this.human = human;
	};

	Player.prototype.mark = "";
	Player.prototype.human = true;

	return Player;
});