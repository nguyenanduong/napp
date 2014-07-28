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
                {
                    createViewContext: { $ref: "wire!" },
                    defaultView: { $ref: "defaultView" },
                    viewsSpec: { $ref: "viewsSpec" }
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