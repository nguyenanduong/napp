define({
	appSettings: {
		clientAppPackage: "napp-sample-client"
	},

	stores: {
		club: {
			create: {
				module: "napp-sample-server/ClubStore"
			}
		}
	}
});