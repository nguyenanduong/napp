define([
	"dojo/_base/declare",
	"napp/StoreController"
], function (
	declare,
	StoreController) {

	return declare([StoreController], {
		get: function (id) {
			return {
				id: "AFC",
				name: "AFC Daner",
				fullName: "Alliance Football Clubs of Daner"
			};
		},

		query: function (params) {
			return [{
				id: "AFC",
				name: "AFC Daner",
				fullName: "Alliance Football Clubs of Daner"
			}, {
				id: "FSB",
				name: "FS Buriki",
				fullName: "FS Buriki Football Club"
			}]
		},

		put: function () {

		},

		post: function () {

		},

		delete: function () {

		}
	});
});