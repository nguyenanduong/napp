define({
	express: {
        module: "dojo/node!express"
    },

    bodyParser: {
        module: "dojo/node!body-parser" 
    },

    dojoConfig: {
        module: "dojo/_base/config"
    },

    packageManager: {
        create: {
            module: "napp/PackageManager",
            args: {
                packages: {
                    $ref: "dojoConfig.packages"
                }
            }
        }
    },

    appSettings: {
        tittle: "Napp - Zero page HTML 5 application",
        listen: 8282
    },

    stores: {

    },

    application: {
        create: {
            module: "napp/ServerApplication",
            args: {
            	listen: { $ref: "appSettings.listen" },
            	express: { $ref: "express" },
                bodyParser: { $ref: "bodyParser" },
                packageManager: { $ref: "packageManager" },
                appSettings: { $ref: "appSettings" },
                stores: { $ref: "stores" }
            }
        }
    }    
});