define({
    settings: {
        defaultView: "home",
        views: {
            home: {
            	center: { 
            		widget: {
    					module: "napp/IntroView"
    				},
            	}
            }
        }
    },

    viewContainer: {
        create: {
            module: "napp/ViewContainer",
            args: [
                {
                    defaultView: { $ref: "settings.defaultView" },
                    views: { $ref: "settings.views" }
                },
                
                { $ref: "dom!root" }
            ]
        }
    },    
    
    application: {
        create: {
            module: "napp/ClientApplication",
            args: {
                viewContainer: { $ref: "viewContainer" }
            }
        }
    },

	plugins: [ { module: "wire/dom" } ]
});