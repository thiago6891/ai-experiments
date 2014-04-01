define(["../../utils/priority-queue"], function (PriorityQueue) {
	var unit_test = {};

	unit_test.prepare = function () {
		var total_nums = 200;
		var assert_array = []
		var test_pq = new PriorityQueue();

		for (var i = 0; i < total_nums; i++) {
			var n = Math.floor(Math.random() * 2 * total_nums) + 1 - total_nums;
			assert_array.push(n);
			test_pq.push(n, n);
		}
		assert_array.sort(function (a, b) { return a - b; });

		var ordered = true;
		for (var i = 0; i < total_nums; i++) {
			if (test_pq.pop() != assert_array.pop()) {
				ordered = false;
				break;
			}
		}

		test("PriorityQueue Random push() and pop() Test", function () {
			ok(ordered);
		});
	};

	return unit_test;
});