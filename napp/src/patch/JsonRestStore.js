define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"dojo/json",
	"dojo/store/JsonRest",
	"dojo/when"
], function (
	declare,
	lang,
	xhr,
	JSON,
	JsonRest, 
	when) {

	return declare([JsonRest], {
		put: function (object, options) {
			options = options || {};
			var id = ("id" in options) ? options.id : this.getIdentity(object);
			var hasId = typeof id != "undefined";

			var results = xhr(hasId && !options.incremental ? "PUT" : "POST", {
				url: hasId ? this.target + id : this.target,
				postData: JSON.stringify(object),
				handleAs: "json",
				headers: lang.mixin({
					"Content-Type": "application/json",
					Accept: this.accepts,
					"If-Match": options.overwrite === true ? "*" : null,
					"If-None-Match": options.overwrite === false ? "*" : null
				}, this.headers, options.headers)
			});

			return when(results, function () {
				var newLocation = results.ioArgs.xhr.getResponseHeader("Location");

				if (newLocation) {
					var pattern = new RegExp("^\/" + this.target.replace(/\//, "\/") + "(.*)$");
					var matchResult = pattern.exec(newLocation);
					if (matchResult) {
						object[this.idProperty] = matchResult[1];
					}
				}

				return object;
			}.bind(this));
		}
	});
});