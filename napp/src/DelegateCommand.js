define([
    "dcl",
    "napp/Command"
], function (
    dcl,
    Command) {
    
    return dcl([Command], {
        executeDelegate: null,
        
        execute: function () {
            this.executeDelegate.apply(this.model, []);
        }        
    });
})