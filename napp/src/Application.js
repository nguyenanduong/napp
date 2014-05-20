define([
	"dojo/_base/declare",
	"dojo/Stateful",
	"dojo/text!./resources/index.html"
], function (
	declare,
	Stateful,
	indexHtml) { 

	return declare([Stateful], {
		listen: null,
		
		express: null,

		run: function (nappDirectory, workingDirectory, clientPackages) {
            var app = this.express();
            
			app.set("views", nappDirectory + "/templates");
			app.set("view engine", "jade");

            // TODO: Testability?
            var indexRoutes = this.express.Router();

            //app.use(this.express.static(workingDirectory + "/public_html"));
            indexRoutes.get("/", function (req, res) {
            	//res.send(indexHtml);
            	res.render("index");
            });


            app.use("/", indexRoutes);

			clientPackages.forEach(function(module) {
                app.use("/script/" + module.name, this.express.static(module.location));                       
            }, this);

            app.listen(this.listen);
            console.log("Listening on " + this.listen);			
		}
	})
})