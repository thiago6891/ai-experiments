define(["../../utils/priority-queue"], function (PriorityQueue) {
	var unit_test = {};

	unit_test.prepare = function () {
		var test_pq = new PriorityQueue();

		test_pq.push(20, 0);
		test_pq.push(20, 10);
		test_pq.push(21, -10);
		test_pq.push(21.5, 5);
		test_pq.push("21.5", -5);

		test("PriorityQueue.push() Test", function () {
			ok(
				test_pq[0].element == 21		&& test_pq[0].priority == -10 &&
				test_pq[1].element == "21.5"	&& test_pq[1].priority == -5 &&
				test_pq[2].element == 20		&& test_pq[2].priority === 0 &&
				test_pq[3].element == 21.5		&& test_pq[3].priority == 5 &&
				test_pq[4].element == 20		&& test_pq[4].priority == 10);
		});
	};

	return unit_test;
});