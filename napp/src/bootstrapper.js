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
	var bootstrapSpec = moduleConfig.bootstrapSpec;

	require([bootstrapSpec, appPackage + "/wire-spec"], function (nappSpec, appSpec) {
		var spec = lang.deepMixin(nappSpec, appSpec);
		when(wire(spec), function (loadedSpec) {
			var app = loadedSpec.application;
			var settings = loadedSpec.settings;
			
			app.run(settings);
		});
	});
});