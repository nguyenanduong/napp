define([
	"dojo/_base/declare",
	"dojo/Stateful",
      "dojo/when"
], function (
	declare,
	Stateful,
      when) { 

	return declare([Stateful], {
		listen: null,		
		express: null,

            packageManager: null,

		run: function (settings) {
                  var clientAppPackageName = settings.clientAppPackage;

                  when(this.packageManager.getDependentPackages(clientAppPackageName), function (clientPackages) {
                        var app = this.express();                        
                        var nappDirectory = this.packageManager.findPackage("napp").location;
                        app.set("views", nappDirectory + "/templates");
                        app.set("view engine", "jade");

                        this._createIndexRoute(app, clientPackages, clientAppPackageName);
                        this._createScriptRoutes(app, clientPackages);
                        this._createStoreRoutes(app, settings.stores);

                        app.listen(this.listen);
                        console.log("Listening on " + this.listen);                 

                  }.bind(this));
		},

            _createIndexRoute: function (app, clientPackages, clientAppPackageName) {
                  // TODO: Testability?
                  var indexRoutes = this.express.Router();

                  indexRoutes.get("/", function (req, res) {
                        //res.send(indexHtml);
                        res.render("index", {
                              clientPackages: clientPackages.map(function (pkg) {
                                    return {
                                          name: pkg.name,
                                          main: pkg.main,
                                          location: "/script/" + pkg.name
                                    };
                              }),
                              clientAppPackageName: clientAppPackageName
                        });
                  });


                  app.use("/", indexRoutes);
            },

            _createScriptRoutes: function (app, clientPackages) {
                  clientPackages.forEach(function(module) {
                      app.use("/script/" + module.name, this.express.static(module.location));                       
                  }, this);
            },

            _createStoreRoutes: function (app, stores) {
                  var router;

                  for (var storeName in stores) {
                        if (stores.hasOwnProperty(storeName)) {
                              router = this.express.Router();

                              router.get("/:id", function (req, res) {
                                    var store = stores[storeName];
            
                                    var item = store.get(req.params.id);
                                    res.json(item);
                              });

                              app.use("/store/" + storeName, router);
                        }
                  }
            }
	})
})