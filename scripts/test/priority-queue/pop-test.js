define(["../../utils/priority-queue"], function (PriorityQueue) {
	var unit_test = {};

	unit_test.prepare = function () {
		var test_pq = new PriorityQueue();

		test_pq.push(20, 0);
		test_pq.push(20, 10);
		test_pq.push(21, -10);
		test_pq.push(21.5, 5);
		test_pq.push("21.5", -5);

		test("PriorityQueue.pop() Test", function () {
			ok(
				test_pq.pop() == 20 &&
				test_pq.pop() == 21.5 &&
				test_pq.pop() == 20 &&
				test_pq.pop() == "21.5" &&
				test_pq.pop() == 21 &&
				test_pq.pop() === undefined);
		});
	};

	return unit_test;
});