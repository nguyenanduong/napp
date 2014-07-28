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

		run: function () {
                  var clientAppPackageName = this.appSettings.clientAppPackage;

                  when(this.packageManager.getDependentPackages(clientAppPackageName), function (clientPackages) {
                        var app = this.express();                        

                        this._createIndexRoute(app, clientPackages, clientAppPackageName);
                        this._createScriptRoutes(app, clientPackages);
                        this._createStoreRoutes(app, this.appSettings.stores);

                        app.listen(this.listen);
                        console.log("Listening on " + this.listen);                 

                  }.bind(this));
		},

            _createIndexRoute: function (app, clientPackages, clientAppPackageName) {
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


                  app.use("/", indexRoutes);
            },

            _createScriptRoutes: function (app, clientPackages) {
                  clientPackages.forEach(function(module) {
                      app.use("/script/" + module.name, this.express.static(module.location));                       
                  }, this);
            },

            _createStoreRoutes: function (app, stores) {
                  for (var storeName in stores) {
                        if (stores.hasOwnProperty(storeName)) {
                              (function (storeName, store) {
                                    var router = new this.express.Router();

                                    router.get("/:id", function (req, res) {
                                          var item = store.get(req.params.id);
                                          res.json(item);
                                    });

                                    app.use("/store/" + storeName, router);
                              }.bind(this))(storeName, stores[storeName]);
                        }
                  }
            }
	})
})