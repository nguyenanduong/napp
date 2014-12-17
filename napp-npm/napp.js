#!/usr/bin/env node

var path = require('path');

// get app folder from command line arguments
var args = process.argv.slice(2);
var appDir = path.resolve(args[0]);

// load package.json and determine jam folder
var packageJson = require(path.join(appDir, "package.json"));
var jamDir = path.join(appDir, packageJson.jam.packageDir);

// load require config from jam
var requireConfig = require(path.join(jamDir, "require.config.js"));
var packages = requireConfig.packages.map(function (pkg) {
    var main = pkg.main && /.js$/.test(pkg.main) ? pkg.main.substr(0, pkg.main.length - 3) : pkg.main;
    return {
        name: pkg.name,
        location: path.join(appDir, pkg.location),
        main: main || "main"
    }
});

// add app package
var appPackage = packageJson.name;
packages.push({
    name: appPackage,
    location: appDir
});

var nappDir = packages.filter(function (pkg) {
    return pkg.name === "napp";
})[0].location

// add search path to node's require, so it is possible to use node modules from amd modules
packages.forEach(function(pkg) {
    require.main.paths.push(pkg.location + "/node_modules");
})

// setup requirejs config
var requirejsConfig = {
    packages: packages,
    config: {
        'napp/bootstrapper': {
            bootstrapSpec: "napp/server-spec",
            appPackage: appPackage,
            additionalParams: {
                requirejsPath: __dirname + "/node_modules/requirejs"
            }
        }
    },
    nodeRequire: require
};
 
var requirejs = require("requirejs");
requirejs.config(requirejsConfig);
requirejs(["napp/bootstrapper"], function() {
    console.log("Bootstrapped");
});
