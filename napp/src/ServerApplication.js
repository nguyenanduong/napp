define([
	"dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/json",
	"dojo/Stateful",
      "dojo/string",
      "dojo/when",
      "requirejs-text!./templates/index.html"
], function (
	declare,
      lang,
      json,
	Stateful,
      string,
      when,
      indexTpl) { 

      // TODO: Refactor the server application. So many responsibilities here.
	return declare([Stateful], {
		listen: null,		
		express: null,
            bodyParser: null,

            packageManager: null,
            appSettings: null,
            stores: null,

		run: function () {
                  var clientAppPackageName = this.appSettings.clientAppPackage;

                  when(this.packageManager.getDependentPackages(clientAppPackageName), function (clientPackages) {
                        var httpApp = this.express();    

                        httpApp.use(this.bodyParser.json());

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
                  var appTitle = this.appSettings.title;

                  indexRoutes.get("/", function (req, res) {
                        var params = {
                              title: appTitle,
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
                                          when(store.get(req.params.id), function (item) {
                                                res.json(item);
                                          });
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
                                          if (rangeBounds) {
                                                options.start = parseInt(rangeBounds[1]);
                                                options.count = parseInt(rangeBounds[2]) - options.start + 1;
                                          }

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

                                    router.delete("/:id", function (req, res) {
                                          when(store.delete(req.params.id), function () {
                                                res.status(204).end();
                                          });
                                    });

                                    router.post("/", function (req, res) {
                                          when(store.post(req.body), function (newId) {
                                                res.header("Location", req.originalUrl + newId).status(200).end();
                                          });
                                    });

                                    router.put("/:id", function (req, res) {
                                          when(store.put(req.body), function () {
                                                res.status(200).end();
                                          });
                                    })

                                    httpApp.use("/store/" + storeName, router);
                              }.bind(this))(storeName, stores[storeName]);
                        }
                  }
            }
	})
})