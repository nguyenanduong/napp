define([
    "dojo/_base/declare",    
    "dojo/Stateful"
], function (
    declare,
    Stateful) {
	
    return declare([Stateful], {
        viewManager: null,
        
        run: function () {
        	this.viewManager.startup();
        }
    });
});