define([
	"dojo/_base/declare",
	"dojo/Stateful",
	"dojo/when"
], function (
	declare,
	Stateful,
	when) {
	
	return declare([Stateful], {
		store: null,

		postscript: function () {
			this.inherited(arguments);

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
		}
	});
});