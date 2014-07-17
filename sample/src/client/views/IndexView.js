define([
	"dojo/_base/declare",
	"dijit/layout/ContentPane"
], function (
	declare,
	ContentPane) {

	return declare([ContentPane], {
		content: "<h1>Napp Sample application</h1>"
	});

});