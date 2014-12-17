define([
    "delite/register",
    "delite/Widget",
    "delite/handlebars!./templates/IndexView.html"
], function (
	register,
	Widget,
	template) {

	return register("napp-sample-indexview", [HTMLElement, Widget], {
		template: template
	});
});