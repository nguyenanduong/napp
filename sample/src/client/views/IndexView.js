define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin"
], function (
	declare,
	_WidgetBase,
	_TemplatedMixin) {

	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: "<div><h1>Napp Sample application</h1></div>"
	});
});