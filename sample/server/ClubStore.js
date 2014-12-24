define([
	"dcl",
	"napp/StoreController"
], function (
	dcl,
	StoreController) {

	return dcl([StoreController], {
		get: function (/*id*/) {
			return {
				id: "AFC",
				name: "AFC Daner",
				fullName: "Alliance Football Clubs of Daner"
			};
		},

		query: function (/*params, options*/) {
			return {
				range: {
					start: 0,
					total: 2
				},
				data: [{
					id: "AFC",
					name: "AFC Daner",
					fullName: "Alliance Football Clubs of Daner"
				}, {
					id: "FSB",
					name: "FS Buriki",
					fullName: "FS Buriki Football Club"
				}]
			};
		},

		put: function (item) {
			console.log(item);
		},

		post: function (item) {
			console.log(item);
		},

		delete: function (/*id*/) {
		}
	});
});