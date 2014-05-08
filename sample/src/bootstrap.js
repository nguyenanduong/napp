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
    packages: [
        // Dojo
        { name: "dojo", location: "amd_modules/dojo" },

        // Wire et al.
        { name: "meld", location: "amd_modules/meld", main: "meld" },
        { name: "when", location: "amd_modules/when", main: "when" },
        { name: "wire", location: "amd_modules/wire", main: "wire" },
        
        { name: "napp", location: "amd_modules/napp" },

        { name: "app", location: "." }
    ],
    
    deps: [ "napp" ] // And array of modules to load on "boot"
};
 
// Now load the Dojo loader
require("./amd_modules/dojo/dojo.js");

