define({
	express: {
        module: "dojo/node!express"
    },

    application: {
        create: {
            module: "napp/Application",
            args: {
            	listen: 8282,
            	express: { $ref: "express" }
            }
        }
    }    
});