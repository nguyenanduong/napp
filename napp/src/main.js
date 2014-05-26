define([
	"module", 
	"dojo/json",
	"wire!napp/wire-spec"
], function (
	module,
	json, 
	nappSpec) {

	var moduleConfig = module.config();
	var appPackage = moduleConfig.appPackage;
	require(["wire!" + appPackage + "/wire-spec"], function (appSpec) {
		var app = appSpec.application || nappSpec.application;

		var clientAppPackageName = appSpec.clientAppPackage;

		var packages = moduleConfig.packages;
		var findPackage = function (pkgName) {
			return packages.filter(function (pkg) {
				return pkg.name === pkgName;
			})[0];
		};

		var clientAppPackage = findPackage(clientAppPackageName);

		var clientPackages = [];
		var addClientPackages = function (pkg) {
			clientPackages.push(pkg);
			require(["dojo/text!" + pkg.location + "/package.json"], function (packageJsonTxt) {
				var packageJson = json.parse(packageJsonTxt);
				var depPkgName;

				if (packageJson.jam && packageJson.jam.dependencies) {
					for (depPkgName in packageJson.jam.dependencies) {
						if (packageJson.jam.dependencies.hasOwnProperty(depPkgName)) {
							var devPkg = findPackage(depPkgName);
							addClientPackages(devPkg);
						}
					};
				}
			});
		};

		addClientPackages(clientAppPackage);

		app.run(moduleConfig.nappDir, moduleConfig.appDir, clientPackages);
	});
});