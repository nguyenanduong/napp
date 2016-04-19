define({
	// Separate view spec from the application spec enables local references like model which is only visible to the component defined in the same section.
	index: {
		view: {
			create: {
				module: "napp-sample-client/views/IndexView",
				args: {
					model: { $ref: "model" },
					goCommand: { $ref: "goCommand" },
					checkAndGoCommand: { $ref: "checkAndGoCommand" }
				}
			}
		},

		goCommand: {
			create: {
				module: "napp/DelegateCommand",
				args: {
					model: { $ref: "model" },
					canExecute: true,
					executeDelegate: { $ref: "model.onGo" }
				}
			}
		},

		checkAndGoCommand: {
			create: {
				module: "napp-sample-client/views/commands/CheckAndGoCommand",
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