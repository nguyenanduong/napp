define([
	"dojo/_base/declare",
	"dojo/Deferred",	
	"dojo/json",
	"dojo/promise/all",
	"dojo/Stateful",
	"dojo/when"
], function (
	declare,
	Deferred,
	json,
	all,
	Stateful,
	when) {

	return declare([Stateful], {
		packages: null,

		getDependentPackages: function (packageName) {
			var pkg = this.findPackage(packageName);

			var packages = [];
			
			return when(this._addDependentPackages(pkg, packages), function () {
				return packages;
			});
		},

		_addDependentPackages: function (pkg, packages) {
		    var def = new Deferred();
		    packages.push(pkg);
		    require(["dojo/text!" + pkg.location + "/package.json"], function (packageJsonTxt) {
		          var packageJson = json.parse(packageJsonTxt);
		          var depPkgName;

		          if (packageJson.jam && packageJson.jam.dependencies) {
		                var loadDepPackagesPromise = [];
		                for (depPkgName in packageJson.jam.dependencies) {
		                      if (packageJson.jam.dependencies.hasOwnProperty(depPkgName)) {
		                            var devPkg = this.findPackage(depPkgName);
		                            loadDepPackagesPromise.push(this._addDependentPackages(devPkg, packages));
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

		    }.bind(this));

		    return def.promise;
		},

		findPackage: function (pkgName) {
			return this.packages.filter(function (pkg) {
				return pkg.name === pkgName;
			})[0];
		}
	})
});