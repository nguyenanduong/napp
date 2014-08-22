define([
    "dojo/_base/declare",
    
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",

    "dojo/text!./templates/ViewContainer.html"
], function (
    declare,
    
    _LayoutWidget, 
    _TemplatedMixin, 
    _WidgetsInTemplateMixin,
    
    BorderContainer,
    ContentPane,


    template) {
    
    return declare([_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        addChild: function (widget) {
            widget.region = "center";
            this._container.addChild(widget);
        },

        removeChild: function (widget) {
            this._container.removeChild(widget);
        },

        layout: function () {
            this._container.resize();
        }
    });
});