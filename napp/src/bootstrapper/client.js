define([
	"module",
	"wire!napp/client-spec"
], function (
	module,
	nappSpec) {

	var rootNode = nappSpec.rootNode;
	rootNode.textContent = "Ehlo";
});