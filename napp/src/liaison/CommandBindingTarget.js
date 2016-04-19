define([
    "liaison/BindingTarget",
    "liaison/DomBindingTarget"
], function(
    BindingTarget
) {
    var EMPTY_ARRAY = [];
    var EMPTY_OBJECT = {};

    function CommandBindingTarget() {
        var args = EMPTY_ARRAY.slice.call(arguments);
        BindingTarget.apply(this, args);
        this.object.addEventListener("click", 
            this.boundEventListenerCallback = this.eventListenerCallback.bind(this));
    }

    CommandBindingTarget.prototype = Object.create(BindingTarget.prototype);
    CommandBindingTarget.prototype.eventListenerCallback = function () {
        var command = this.source.value;

        if (command && command.canExecute && command.execute) {
            command.execute(EMPTY_ARRAY.slice.call(arguments));
        }
    };
    CommandBindingTarget.prototype.remove = CommandBindingTarget.prototype.close = function () {
        BindingTarget.prototype.remove.call(this);
        if (this.boundEventListenerCallback) {
            this.object.removeEventListener(this.eventName, this.boundEventListenerCallback);
            this.boundEventListenerCallback = null;
        }
    };    

    var defaultBind = HTMLElement.prototype.bind;
    HTMLElement.prototype.bind = function (property, source) {
            if (property === "command") {
                var target = (this.bindings || EMPTY_OBJECT)[property];
                target = target
                || new CommandBindingTarget(this, property);
                
                return target.bind(source);
            } else {
                return defaultBind.apply(this, EMPTY_ARRAY.slice.call(arguments));
            }
        };

    return CommandBindingTarget;
});
