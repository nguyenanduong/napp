define({
	express: {
        module: "express"
    },

    bodyParser: {
        module: "body-parser" 
    },

    packageManager: {
        create: {
            module: "napp/PackageManager",
            args: {
                packages: require.s.contexts._.config.packages // TODO: Send from napp-npm to bootstrapper
            }
        }
    },

    appSettings: {
        title: "Napp - Zero page HTML 5 application",
        listen: 8282
    },

    stores: {

    },

    application: {
        create: {
            module: "napp/ServerApplication",
            args: {
            	express: { $ref: "express" },
                bodyParser: { $ref: "bodyParser" },
                packageManager: { $ref: "packageManager" },
                appSettings: { $ref: "appSettings" },
                stores: { $ref: "stores" },
                requirejsPath: { $ref: "requirejsPath" }
            }
        }
    }    
});