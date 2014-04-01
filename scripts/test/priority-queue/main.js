requirejs.config({
	baseUrl: "../",
	paths: {
		QUnit: "qunit-1.14.0"
	},
	shim: {
		QUnit: {
			exports: "QUnit",
			init: function () {
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
	}
});

require(
	[
		"QUnit",
		"priority-queue/find-index-test",
		"priority-queue/push-test",
		"priority-queue/pop-test",
		"priority-queue/random-push-pop-test"
	],
	function (QUnit, test_1, test_2, test_3, test_4) {
		test_1.prepare();
		test_2.prepare();
		test_3.prepare();
		test_4.prepare();

		QUnit.load();
		QUnit.start();
	}
);