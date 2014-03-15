var Cell = function(x, y) {
	this.x = x;
	this.y = y;
};

var Grid = function(rows, cols) {
	this._element = ($("#grid"))[0];
	this._ctx = this._element.getContext("2d");
	this._cells = [];
	this._rows = rows;
	this._cols = cols;
	this._hCell = 0;
	this._wCell = 0;
	
	this.onGridGenerated = function() {};
	
	this._clear = function() {
		_ctx.clearRect(0, 0, this._element.width, this._element.width);
	};
	
	this._generate = function() {
		this._wCell = Number(this._element.width) / this._cols;
		this._hCell = Number(this._element.height) / this._rows;
		
		this._cells = [];
		for (var i = 0; i < this._cols; i++) {
			var column = [];
			for (var j = 0; j < this._rows; j++) {
				var c = new Cell(i * this._wCell, j * this._hCell);
				column.push(c);
				this._ctx.strokeRect(c.x, c.y, this._wCell, this._hCell);
			}
			this._cells.push(column);
		}
		
		this.onGridGenerated();
	};
	
	this.regenerate = function(rows, cols) {
		this._ctx.clearRect(0, 0, this._element.width, this._element.height);
		this._rows = rows;
		this._cols = cols;
		this._generate();
	};
	
	this.cellWidth = function() {
		return this._wCell;
	};
	
	this.cellHeight = function() {
		return this._hCell;
	};
	
	this.setOnClick = function(f) {
		this._element.onclick = f;
	};
	
	this.highlightCellAt = function(xPos, yPos) {
		var x = Math.floor(xPos / this._wCell);
		var y = Math.floor(yPos / this._hCell);
		this._highlight(this._cells[x][y]);
	};
	
	this.highlightExplored = function (x, y) {
	    this._ctx.fillStyle = "#0000FF";
	    this._highlight(this._cells[x][y]);
	    this._ctx.fillStyle = "#000000";
	};

	this.highlightFrontier = function (x, y) {
	    this._ctx.fillStyle = "#00FF00";
	    this._highlight(this._cells[x][y]);
	    this._ctx.fillStyle = "#000000";
	};

	this._highlight = function(cell) {
		this._ctx.fillRect(cell.x, cell.y, this._wCell, this._hCell);
	};
	
	this.rows = function() {
		return this._rows;
	};
	
	this.cols = function() {
		return this._cols;
	};
	
	this.getStateOfCellAt = function(xPos, yPos) {
		var x = Math.floor(xPos / this._wCell);
		var y = Math.floor(yPos / this._hCell);
		return new State(x, y);
	};
	
	this._generate();
};

var State = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.equals = function(s) {
		return x == s.x && y == s.y;
	};
};

var UP = "UP";
var RIGHT = "RIGHT";
var DOWN = "DOWN";
var LEFT = "LEFT";

var Node = function(problem, action, parent) {
	if (parent != null) {
		this.state = problem.result(parent.state, action);
	} else {
		this.state = null;
	}
	this.action = action;
	this.parent = parent;
};

var Problem = function(init, goal, grid) {
	this._init = init;
	this._goal = goal;
	this._grid = grid;
	
	this.initialState = function() {
		return this._init;
	};
	
	this.actions = function(s) {
		r = [];
		
		if (s.y > 0) {
			r.push(UP);
		}
		if (s.x < this._grid._cols - 1) {
			r.push(RIGHT);
		}
		if (s.y < this._grid._rows - 1) {
			r.push(DOWN);
		}
		if (s.x > 0) {
			r.push(LEFT);
		}
		
		return r;
	};
	
	this.result = function(s, a) {
		var r = null;
		
		if (a == UP) {
			r = new State(s.x, s.y - 1);
		} else if (a == RIGHT) {
			r = new State(s.x + 1, s.y);
		} else if (a == DOWN) {
			r = new State(s.x, s.y + 1);
		} else if (a == LEFT) {
			r = new State(s.x - 1, s.y);
		}
		
		return r;
	};
	
	this.goalTest = function(s) {
		return s.equals(this._goal);
	};
};

var Agent = function(problem) {
	this._problem = problem;
	
	this._searching = true;
	this._executing = false;
	
	this._frontier = [];
	var node = new Node(null, null, null);
	node.state = this._problem.initialState();
	this._frontier.push(node);
	
	if (this._problem.goalTest(node.state)) {
		this._solution(node);
		this._frontier.pop();
		this._searching = false;
	}
	
	this._explored = [];
	
	this._seq = [];
	this._solution = function (node) {
	    this._seq = [];
	    while (!node.state.equals(this._problem.initialState())) {
	        this._seq.push(node.state);
	        node = node.parent;
	    }
	    this._seq.push(node.state);
	};
	
	this._inExplored = function (state) {
	    for (var i = 0; i < this._explored.length; i++) {
	        if (this._explored[i].equals(state)) {
	            return true;
	        }
	    }
	    return false;
	};

	this._inFrontier = function (state) {
	    for (var i = 0; i < this._frontier.length; i++) {
	        if (this._frontier[i].state.equals(state)) {
	            return true;
	        }
	    }
	    return false;
	};
};

var loop;
var solveBFS = function (agent) {
    loop = setInterval(function () { breadthFirstSearch(agent); }, 33);
};

var breadthFirstSearch = function (agent) {
    if (agent._searching) {
        var node = agent._frontier.pop();
        agent._explored.push(node.state);
        agent._problem._grid.highlightExplored(node.state.x, node.state.y);
        var actions = agent._problem.actions(node.state);
        for (var i = 0; i < actions.length; i++) {
            var child = new Node(agent._problem, actions[i], node);
            if (!agent._inExplored(child.state) && !agent._inFrontier(child.state)) {
                if (agent._problem.goalTest(child.state)) {
                    agent._solution(child);
                    agent._searching = false;
                    agent._executing = true;
                    return;
                }
                agent._frontier.push(child);
                agent._problem._grid.highlightFrontier(child.state.x, child.state.y);
            }
        }
    } else if (agent._executing) {
        if (agent._seq.length != 0) {
            var s = agent._seq.pop();
            agent._problem._grid._highlight(agent._problem._grid._cells[s.x][s.y]);
        } else {
            agent._executing = false;
        }
    } else {
        clearInterval(loop);
    }
};

var grid;
var init;
var goal;

var generateGrid = function() {
	init = null;
	goal = null;
	var cols = Number($("#columnsQty").val());
	var rows = Number($("#rowsQty").val());
	grid.regenerate(rows, cols);
	disableSearchButtons();
};

var getState = function(e) {
	grid.highlightCellAt(e.layerX, e.layerY);
	return grid.getStateOfCellAt(e.layerX, e.layerY);
}

var onGridClick = function(e) {
	var state = getState(e);
	if (init == null) {
		init = state;
	} else if (goal == null) {
		goal = state;
	}
	enableNextStateSelection();
};

var enableNextStateSelection = function() {
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

var enableSearchButtons = function() {
	$("#dfsBtn").attr("disabled", false);
	$("#bfsBtn").attr("disabled", false);
	$("#asBtn").attr("disabled", false);
};

var disableSearchButtons = function() {
	$("#dfsBtn").attr("disabled", true);
	$("#bfsBtn").attr("disabled", true);
	$("#asBtn").attr("disabled", true);
};

var startDFS = function() {
	
};

var startBFS = function() {
	var problem = new Problem(init, goal, grid);
	var agent = new Agent(problem);
	solveBFS(agent);
};

var startAS = function() {
	
};

$(document).ready(function() {
	grid = new Grid(0, 0);
	grid.onGridGenerated = enableNextStateSelection;
	$("#generateBtn").click(generateGrid);
	$("#dfsBtn").click(startDFS);
	$("#bfsBtn").click(startBFS);
	$("#asBtn").click(startAS);
});
