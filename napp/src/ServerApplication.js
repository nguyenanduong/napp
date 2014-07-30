define([
	"dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/json",
	"dojo/Stateful",
      "dojo/string",
      "dojo/when",
      "dojo/text!./templates/index.html"
], function (
	declare,
      lang,
      json,
	Stateful,
      string,
      when,
      indexTpl) { 

	return declare([Stateful], {
		listen: null,		
		express: null,

            packageManager: null,
            appSettings: null,
            stores: null,

		run: function () {
                  var clientAppPackageName = this.appSettings.clientAppPackage;

                  when(this.packageManager.getDependentPackages(clientAppPackageName), function (clientPackages) {
                        var httpApp = this.express();                        

                        this._createIndexRoute(httpApp, clientPackages, clientAppPackageName);
                        this._createScriptRoutes(httpApp, clientPackages);
                        this._createStoreRoutes(httpApp, this.stores);

                        httpApp.listen(this.listen);
                        console.log("Listening on " + this.listen);                 

                  }.bind(this));
		},

            _createIndexRoute: function (httpApp, clientPackages, clientAppPackageName) {
                  // TODO: Testability?
                  var indexRoutes = this.express.Router();

                  indexRoutes.get("/", function (req, res) {
                        var params = {
                              clientPackages: json.stringify(clientPackages.map(function (pkg) {
                                    return {
                                          name: pkg.name,
                                          main: pkg.main,
                                          location: "/script/" + pkg.name
                                    };
                              })),
                              clientAppPackageName: clientAppPackageName
                        };

                        var indexHtml = string.substitute(indexTpl, params);

                        res.send(indexHtml);
                  });

                  httpApp.use("/", indexRoutes);
            },

            _createScriptRoutes: function (httpApp, clientPackages) {
                  clientPackages.forEach(function(module) {
                      httpApp.use("/script/" + module.name, this.express.static(module.location));                       
                  }, this);
            },

            _createStoreRoutes: function (httpApp, stores) {
                  for (var storeName in stores) {
                        if (stores.hasOwnProperty(storeName)) {
                              (function (storeName, store) {
                                    var router = new this.express.Router();

                                    router.get("/:id", function (req, res) {
                                    });

                                    router.get("/", function(req, res) {
                                          var query = {}, options = {};

                                          // Extract sort options and query
                                          for (var key in req.query) {
                                                if (req.query.hasOwnProperty(key)) {
                                                      if (key.indexOf("sort") === 0) {
                                                            options.sort = [];

                                                            var parts = /^sort\((.*)\)$/g.exec(key);
                                                            var sortInfo = parts[1];
                                                            var sortParts = sortInfo.split(",");

                                                            sortParts && sortParts.map(function (item) {
                                                                  return item.trim();
                                                            }).forEach(function (sortPart) {                                                                  
                                                                  var sortPartDetails = /^(-*)(.*)$/.exec(sortPart);
                                                                  options.sort.push({
                                                                        attribute: sortPartDetails[2],
                                                                        descending: sortPartDetails[1] === "-",
                                                                  });
                                                            });
                                                      } else {
                                                            query[key] = req.query[key];
                                                      }
                                                }
                                          }

                                          var range = req.header("range");
                                          var rangeBounds = /^items=(\d+)-(\d+)$/.exec(range);
                                          options.start = parseInt(rangeBounds[1]);
                                          options.count = parseInt(rangeBounds[2]) - options.start + 1;

                                          when(store.query(query, options), function (result) {
                                                var items = result && result.data ? result.data : result;
                                                var range = result && result.range ? result.range : null;

                                                if (range) {
                                                      res.header("Content-Range", lang.replace("items {start}-{end}/{total}", {
                                                            start: range.start,
                                                            end: range.start + items.length - 1,
                                                            total: range.total
                                                      }));
                                                }

                                                res.json(items);
                                          });
                                    });

                                    httpApp.use("/store/" + storeName, router);
                              }.bind(this))(storeName, stores[storeName]);
                        }
                  }
            }
	})
})