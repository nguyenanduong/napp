define({
	index: {
		view: {
			create: {
				module: "napp-sample-client/views/IndexView",
				args: {
					model: { $ref: "model" }
				}
			}
		},

		model: {
			create: {
				module: "napp-sample-client/views/viewmodels/IndexViewModel",
				args: {
					store: { $ref: "stores.club" }
				}
			}
		}
	}
});