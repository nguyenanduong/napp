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

			when(this.store.get("AFC"), function (item) {
				console.log(item);
			});

		// 	when(this.store.query({
		// 		id: "AFC"
		// 	}), function (item) {
		// 		console.log(item);
		// 	});
		// }
	});
});