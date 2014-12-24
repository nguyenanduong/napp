define(["../require.config.js"], function (requireConfig) {
    return {
	   useLoader: {
		  "host-node": "requirejs"
	   },

	   loader: requireConfig
    };
});
