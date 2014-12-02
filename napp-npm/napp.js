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

// setup dojo config
dojoConfig = {
    async: 1, // We want to make sure we are using the "modern" loader
    hasCache: {
        "host-node": 1, // Ensure we "force" the loader into Node.js mode
        "dom": 0 // Ensure that none of the code assumes we have a DOM
    },
    // While it is possible to use config-tlmSiblingOfDojo to tell the
    // loader that your packages share the same root path as the loader,
    // this really isn't always a good idea and it is better to be
    // explicit about our package map.

    packages: packages,
    
    //deps: [ "napp/bootstrapper" ], // Load the napp module which contains the bootstrapper.

    config: {
        'napp/bootstrapper': {
            bootstrapSpec: "napp/server-spec",
            appPackage: appPackage
        }
    },

    nodeRequire: require
};
 
//// Now load the Dojo loader
//var dojoPkg = packages.filter(function (pkg) {
//    return pkg.name === "dojo"
//})[0];

//var dojoPath = path.join(dojoPkg.location, "dojo.js");

//require(dojoPath);

packages.forEach(function(pkg) {
    require.main.paths.push(pkg.location + "/node_modules");
})

var requirejs = require("requirejs");
requirejs.config(dojoConfig);
requirejs(["napp/bootstrapper"], function() {
    console.log("Bootstrapped");
});
