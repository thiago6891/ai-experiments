var PriorityQueue = function() {
    Array.call(this);
};

PriorityQueue.prototype = [];
PriorityQueue.prototype.constructor = PriorityQueue;

// this function uses a divide and conquer strategy to find the index 
// where an element with priority p must be inserted
PriorityQueue.prototype.find_index = function(start, end, p) {
    // in the base case (one element) we just have to find out if the
    // new element should be inserted before or after the only element
    if (start == end) {
        if (p <= this[start].priority) return start;
        else return start + 1;
    }
    
    var mid = Math.floor((end + start) / 2);
    
    if (p == this[mid].priority) return mid;
    if (p < this[mid].priority) 
        return this.find_index(start, mid - 1, p);
    if (p > this[mid].priority) 
        return this.find_index(mid + 1, end, p);
};

PriorityQueue.prototype.push = function(e, p) {
    if (e === undefined || p === undefined) return;
    
    var idx = 0;
    if (this.length > 0)
        idx = this.find_index(0, this.length - 1, p);
    
    Array.prototype.splice.call(
        this, 
        idx,
        0,
        {
            element: e,
            priority: p
        });
};

PriorityQueue.prototype.pop = function() {
    var item = Array.prototype.pop.call(this);
    if (item !== undefined) return item.element;
    return undefined;
};
