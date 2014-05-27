define([
	"module", 
	"dojo/Deferred",
	"dojo/json",
	"dojo/promise/all",
	"dojo/when",
	"wire!napp/server-spec"
], function (
	module,
	Deferred,
	json,
	all,
	when,
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
			var def = new Deferred();
			clientPackages.push(pkg);
			require(["dojo/text!" + pkg.location + "/package.json"], function (packageJsonTxt) {
				var packageJson = json.parse(packageJsonTxt);
				var depPkgName;

				if (packageJson.jam && packageJson.jam.dependencies) {
					var loadDepPackagesPromise = [];
					for (depPkgName in packageJson.jam.dependencies) {
						if (packageJson.jam.dependencies.hasOwnProperty(depPkgName)) {
							var devPkg = findPackage(depPkgName);
							loadDepPackagesPromise.push(addClientPackages(devPkg));
						}
					};
					when(all(loadDepPackagesPromise), function () {
						def.resolve();
					}, function () {
						def.reject();
					})
				} else {
					def.resolve();
				}

			});

			return def.promise;
		};

		when(addClientPackages(clientAppPackage), function () {
			app.run(moduleConfig.nappDir, moduleConfig.appDir, clientPackages);
		});
	});
});