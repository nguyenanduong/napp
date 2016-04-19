define([
	"dcl",
    "delite/register",
    "delite/Widget",
    "requirejs-text!./templates/IndexView.html",
    "liaison/delite/createRenderer",
    "liaison/wrapper",
    "napp/liaison/CommandBindingTarget",
    "deliteful/Button",
], function (
	dcl,
	register,
	Widget,
	template,
	createRenderer,
    wrapper) {

	return register("napp-sample-indexview", [HTMLElement, Widget], {
		render: createRenderer(template),

		startup: dcl.superCall(function(base) {
			return function() {
				base.apply(this, arguments);
				this.model.initialize();
			};
		})
	});
});
