define([
	"module",
	"dojo/when",
	"napp/utils/lang",
	"wire"
], function (
	module,
	when,
	lang,
	wire) {

	var moduleConfig = module.config();
	var appPackage = moduleConfig.appPackage;

	require(["napp/server-spec", appPackage + "/wire-spec"], function (nappSpec, appSpec) {
		var spec = lang.deepMixin(nappSpec, appSpec);
		when(wire(spec), function (spec) {
			var app = spec.application;
			app.run(spec.settings);
		});
	});
});