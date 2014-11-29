define({
    defaultView: "intro",
    viewsSpec: [{
        literal: {
            intro: {
                view: {
                    create: {
                        module: "napp/IntroView"
                    }
                }
            }
        }
    }],



    viewContainer: {
        create: {
            module: "napp/ViewContainer",
            args: [
                { },                
                { $ref: "dom!root" }
            ]
        }
    },

    viewManager: {
        create: {
            module: "napp/ViewManager",
            args: {
                viewContainer: { $ref: "viewContainer" },
                createViewContext: { $ref: "wire!" },
                defaultView: { $ref: "defaultView" },
                viewsSpec: { $ref: "viewsSpec" }
            }
        }
    },
    
    application: {
        create: {
            module: "napp/ClientApplication",
            args: {
                viewManager: { $ref: "viewManager" }
            }
        }
    },

	plugins: [ { module: "wire/dom" }, { module: "napp/wire/rest", $ns: "napp" } ]
});