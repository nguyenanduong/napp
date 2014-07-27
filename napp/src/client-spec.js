define({
    settings: {
        // defaultView: "home",
        // // viewsSpec: ""
        // viewsSpec: {
        //     builtin: {
        //         // literal: {
        //         //     home: {
        //         //         view: {
        //         //             create: {
        //         //                 module: "napp/IntroView"
        //         //             }
        //         //         }
        //         //     }
        //         // }
        //     }
        // }
    },

    viewContainer: {
        create: {
            module: "napp/ViewContainer",
            args: [
                {
                    defaultView: { $ref: "settings.defaultView" },
                    viewsSpec: { $ref: "settings.viewsSpec" }
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