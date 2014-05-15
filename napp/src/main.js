define(["module", "wire!napp/wire-spec"], function (module, nappSpec) {
	var moduleConfig = module.config();
	var appPackage = moduleConfig.appPackage;
	require(["wire!" + appPackage + "/wire-spec"], function (appSpec) {
		var app = appSpec.application || nappSpec.application;
		app.run(moduleConfig.nappDir, moduleConfig.appDir);
	});
});