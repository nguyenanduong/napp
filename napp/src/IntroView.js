define([
    "delite/register",
    "delite/Widget",
    "delite/handlebars!./templates/IntroView.html"
], function (
	register, 
	Widget, 
	template) {

    return register("napp-introview", [HTMLElement, Widget], {
            // my template
            template: template,

            // my public properties
            greeting: "Napp - Zero page web application framework for nodejs and dojo"
        }
    );
});


