define({
	express: {
        module: "dojo/node!express"
    },

    settings: {
        clientAppPackage: "napp-sample-client"
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

    application: {
        create: {
            module: "napp/Application",
            args: {
            	listen: 8282,
            	express: { $ref: "express" },
                packageManager: {$ref: "packageManager" }
            }
        }
    }    
});