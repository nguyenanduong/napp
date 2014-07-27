define([
	"module",
	"dojo/Deferred",
	"dojo/when",
	"napp/utils/lang",
	"wire"
], function (
	module,
	Deferred,
	when,
	lang,
	wire) {

	var moduleConfig = module.config();
	
	var appPackage = moduleConfig.appPackage;
	var bootstrapSpec = moduleConfig.bootstrapSpec;

	var d = new Deferred();

	require([bootstrapSpec, appPackage + "/wire-spec"], function (nappSpec, appSpec) {
		var spec = lang.deepMixin(nappSpec, appSpec);
		when(wire(spec), function (loadedSpec) {
			var app = loadedSpec.application;
			var settings = loadedSpec.settings;
			
			d.resolve(loadedSpec);

			app.run(settings);
		});
	});

	return d.promise;
});