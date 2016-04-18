define([
	"intern!bdd",
    "intern/chai!expect",
	"napp-sample-server/ClubStore"
], function (
	bdd,
	expect,
	ClubStore
) {
	var describe = bdd.describe, before = bdd.before, it = bdd.it;
	describe("ClubStore tests", function () {
		var store;

		before(function() {
			store = new ClubStore();
		});

		it("should do something", function () {
			expect(null).to.be.null;
		});
	});
});