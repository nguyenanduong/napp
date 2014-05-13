define([
	"dojo/_base/declare",
	"dojo/Stateful"
], function (
	declare,
	Stateful) { 

	return declare([Stateful], {
		listen: null,
		
		express: null,

		run: function (workingDirectory) {
            var app = this.express();
            
            app.use(this.express.static(workingDirectory + "/public_html"));
            
            app.listen(this.listen);
            console.log("Listening on " + this.listen);			
		}
	})
})