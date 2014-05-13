#!/usr/bin/env node

var path = require('path');

// get app folder from command line arguments
var args = process.argv.slice(2);
var appDir = args[0];
var appDir = path.resolve(args[0]);

// load package.json and determine jam folder
var packageJson = require(path.join(appDir, "package.json"));
var jamDir = path.join(appDir, packageJson.jam.packageDir);

// load require config from jam
var requireConfig = require(path.join(jamDir, "require.config.js"));
var packages = requireConfig.packages.map(function (pkg) {
    return {
        name: pkg.name,
        location: path.join(appDir, pkg.location),
        main: pkg.main || "main"
    }
});

// add app package
packages.push({
    name: "app",
    location: appDir
});

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

    config: {
        'napp/main': {
            appDir: appDir
        }
    },
    
    deps: [ "napp" ] // And array of modules to load on "boot"
};
 
// Now load the Dojo loader
var dojoPkg = packages.filter(function (pkg) {
    return pkg.name === "dojo"
})[0];

var dojoPath = path.join(dojoPkg.location, "dojo.js");

require(dojoPath);

