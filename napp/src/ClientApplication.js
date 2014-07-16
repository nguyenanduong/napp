define([
    "dojo/_base/declare",    
    "dojo/Stateful"
], function (
    declare,
    Stateful) {
	
    return declare([Stateful], {
        viewContainer: null,
        
        run: function () {
        	this.viewContainer.startup();    
        }
    });
});