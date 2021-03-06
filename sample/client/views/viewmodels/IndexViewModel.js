define([
	"dcl",
	"decor/Stateful",
	"dojo/when",
	"napp/Command"
], function (
	dcl,
	Stateful,
	when,
	Command) {
	
	return dcl([Stateful], {
		store: null,

		greeting: "Hello, I am napp",

		goCommand: null,

		initialize: function () {
			// GET
			// when(this.store.get("AFC"), function (item) {
			// 	console.log(item);
			// });

			// QUERY
			// when(this.store.query({
			// 	id: "AFC"
			// }, {
			// 	start: 10,
			// 	count: 10,
			// 	sort: [
			// 		{ attribute: "foo", descending: true },
			// 		{ attribute: "bar", descending: false }
			// 	]
			// }), function (items) {				
			// 	console.log(items);
			// });

			// DELETE
			// when(this.store.remove("AFC"), function (result) {
			// 	console.log(result);
			// });

			// PUT
			when(this.store.put({
				id: "AFC",
				name: "AFC Daner",
				founded: "2060"
			}), function (result) {
				console.log(result);
			});

			// POST
			// when(this.store.put({
			// 	name: "AFC Daner Reserve",
			// 	founded: "2060"
			// }), function (result) {
			// 	console.log(result);
			// });
		},

		onGo: function () {
			alert(this.greeting);
		}
	});
});