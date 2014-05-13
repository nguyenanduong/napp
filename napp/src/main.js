define(["module", "wire!napp/wire-spec", "wire!app/wire-spec"], function (module, nappSpec, appSpec) {    
	var app = appSpec.application || nappSpec.application;
	var moduleConfig = module.config();
	app.run(moduleConfig.appDir);
});