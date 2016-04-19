define([
    "dcl",
    "napp/Command"
], function (
    dcl,
    Command) {
    
    return dcl([Command], {
        constructor: dcl.advise({
            after: function() {
                this.canExecute = !!this.model.greeting;
                this.model.observe(function () {
                    this.canExecute = !!this.model.greeting;
                }.bind(this));
            }
        }),

        execute: function() {
            alert(this.model.greeting);
        }        
    });
});