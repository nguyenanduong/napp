define([
    "dcl",    
    "decor/Stateful"
], function (
    dcl,
    Stateful) {
	
    return dcl([Stateful], {
        viewManager: null,
        
        run: function () {
        	this.viewManager.initialize();
        }
    });
});