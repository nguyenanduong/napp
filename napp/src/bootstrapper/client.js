define([
	"module",
	"dojo/when",
	"wire"
], function (
	module,
	when,
	wire) {

	var moduleConfig = module.config();
	var appPackage = moduleConfig.appPackage;

	when(wire(["napp/client-spec", appPackage + "/wire-spec"]), function (spec) {
		var app = spec.application;
		app.run();
	});

});