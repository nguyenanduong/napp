define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/hash",
    "dojo/router",
    "dojo/when",
    
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",

    "dojo/text!./templates/ViewContainer.html"
], function (
    declare,
    lang,
    hash,
    router,
    when,
    
    _WidgetBase, 
    _TemplatedMixin, 
    _WidgetsInTemplateMixin,
    
    BorderContainer,
    ContentPane,

    template) {
    
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        
        createViewContext: null, // Injected
        viewsSpec: null, // Injected
        defaultView: null, // Injected

        _viewSpecsHash: null,        
        _currentViewWidgets: [],

        postCreate: function () {
            this.inherited(arguments);

            router.register(/^(\w*)(\?*)(.*)$/, (this, function (evt) {
                var viewName = evt.params[0],
                    paramString = evt.params[1],
                    paramHash = {};
                
                var regex = /([^=]+)=([^=]+)(?:&|$)/g;
                var match;
                
                while ((match = regex.exec(paramString)) !== null) {
                    paramHash[match[1]] = match[2];
                }
                                
                this._loadView(viewName, paramHash);
            }).bind(this));

            require([this.viewsSpec[1]], function (viewsSpec) {
                this._viewSpecsHash = viewsSpec;                

                router.startup();
                if (hash() === "") {
                    router.go(this.defaultView);
                }
            }.bind(this));
        },
        
        destroy: function () {
            this._unloadCurrentView();
            this.inherited(arguments);
        },
        
        _loadView: function (viewName, params) {
            var specToLoad = {};
            specToLoad[viewName] = this._viewSpecsHash[viewName];

            when(this.createViewContext(specToLoad), function (loadedViewSpec) {
                widget = loadedViewSpec[viewName].view;
                widget.region = "center";
                this._container.addChild(widget);
            }.bind(this));
        },
        
        _unloadCurrentView: function () {
            if (this._currentViewWidgets) {
                this._currentViewWidgets.forEach(function (widget) {
                    widget.destroy();
                });
                this._currentViewWidgets = [];
            }      
        }
    });
});