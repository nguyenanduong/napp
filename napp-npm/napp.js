#!/usr/bin/env node

var path = require('path');

// get app folder from command line arguments
var args = process.argv.slice(2);
var appFolder = args[0];
var appFolder = path.resolve(args[0]);

// determine jam folder

// load require config from jam

// setup dojo config

// load dojo

// Configuration Object for Dojo Loader:
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

    //baseUrl: appFolder,

    packages: [

        // Dojo
        { name: "dojo", location: path.join(appFolder, "amd_modules/dojo") },

        // Wire et al.
        { name: "meld", location: path.join(appFolder, "amd_modules/meld"), main: "meld" },
        { name: "when", location: path.join(appFolder, "amd_modules/when"), main: "when" },
        { name: "wire", location: path.join(appFolder, "amd_modules/wire"), main: "wire" },
        
        { name: "napp", location: path.join(appFolder, "amd_modules/napp") },

        { name: "app", location: appFolder }
    ],
    
    deps: [ "napp" ] // And array of modules to load on "boot"
};
 
// Now load the Dojo loader
require(path.join(appFolder, "amd_modules/dojo/dojo.js"));

