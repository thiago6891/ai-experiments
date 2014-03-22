define(function () {
    var Node = function () { };

    Node.prototype.state = null;
    Node.prototype.parent = null;
    Node.prototype.action = null;
    Node.prototype.path_cost = 0;

    return Node;
});
