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
                                          var item = store.get(req.params.id);
                                          res.json(item);
                                    });

                                    httpApp.use("/store/" + storeName, router);
                              }.bind(this))(storeName, stores[storeName]);
                        }
                  }
            }
	})
})