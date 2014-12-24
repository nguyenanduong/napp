#!/usr/bin/env node

var path = require('path');

// get app folder from command line arguments
var args = process.argv.slice(2);
var appDir = path.resolve(args[0]);

// load package.json and determine jam folder
var packageJson = require(path.join(appDir, "package.json"));

// load require config
var requireConfig = require(path.join(appDir, "require.config.js"));
var packages = requireConfig.packages.map(function (pkg) {
    var main = pkg.main && /.js$/.test(pkg.main) ? pkg.main.substr(0, pkg.main.length - 3) : pkg.main;
    return {
        name: pkg.name,
        location: path.join(appDir, pkg.location),
        main: main || "main"
    }
});

require.main.paths.push(path.join(appDir, "node_modules"));

// setup requirejs config
var requirejsConfig = {
    packages: packages,
    config: {
        'napp/bootstrapper': {
            bootstrapSpec: "napp/server-spec",
            appPackage: packageJson.name,
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
