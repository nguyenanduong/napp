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

		run: function (workingDirectory) {
            var app = this.express();
            
            // TODO: Testability?
            var indexRoutes = this.express.Router();

            //app.use(this.express.static(workingDirectory + "/public_html"));
            indexRoutes.get("/", function (req, res) {
            	res.send(indexHtml);
            });

            app.use("/", indexRoutes);
            
            app.listen(this.listen);
            console.log("Listening on " + this.listen);			
		}
	})
})