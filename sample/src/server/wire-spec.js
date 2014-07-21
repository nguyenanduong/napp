define({
	settings: {
		clientAppPackage: "napp-sample-client",

		stores: {
			club: {
				create: {
					module: "napp-sample-server/ClubStore"
				}
			}
		}
	}
});