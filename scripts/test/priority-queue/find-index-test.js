define(["../../utils/priority-queue"], function (PriorityQueue) {
	var unit_test = {};

	unit_test.prepare = function () {
		var test_pq = new PriorityQueue();

		test_pq[0] = { element: 0, priority: -10 };
		test_pq[1] = { element: 0, priority: -5 };
		test_pq[2] = { element: 0, priority: 0 };
		test_pq[3] = { element: 0, priority: 5 };
		test_pq[4] = { element: 0, priority: 10 };

		test("PriorityQueue.find_index() Test", function () {
			ok(
				test_pq.find_index(0, 4, -11) == 0 &&
				test_pq.find_index(0, 4, -7) == 1 &&
				test_pq.find_index(0, 4, -3) == 2 &&
				test_pq.find_index(0, 4, 2) == 3 &&
				test_pq.find_index(0, 4, 8) == 4 &&
				test_pq.find_index(0, 4, 12) == 5);
		});
	};

	return unit_test;
});