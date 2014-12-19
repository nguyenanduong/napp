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
            module: "deliteful/ViewStack",
            args: { }                
        }
    },

    viewManager: {
        create: {
            module: "napp/ViewManager",
            args: {
                root: { $ref: "dom!root" },
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