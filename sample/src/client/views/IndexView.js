define([
	"dcl",
    "delite/register",
    "delite/Widget",
    "delite/handlebars!./templates/IndexView.html"
], function (
	dcl,
	register,
	Widget,
	template) {

	return register("napp-sample-indexview", [HTMLElement, Widget], {
		template: template,

		startup: dcl.superCall(function(base) {
			return function() {
				base.apply(this, arguments);
				this.model.initialize();
			}
		})
	});
});