define(["dojo/declare", "napp/Application"], function (declare, Application) {
	return declare([Application], {
		run: function () {
			this.inherited(arguments);
			console.log("Sample application is started and running");
		}
	});
})