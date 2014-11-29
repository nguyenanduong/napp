define({
    defaultView: "index",
    viewsSpec: [
    	"napp-sample-client/views/views-spec"
    ],

    stores: {
    	club: { $ref: "napp:rest!store/club/" }
    }
});