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

    "napp/bootstrapper",
    
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

    rootContext,
    
    template) {
    
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        
        views: null, // Injected
        viewsSpec: null, // Injected
        defaultView: null, // Injected
        
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

            require([this.viewsSpec], function (viewsSpec) {
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
            // var view = this.views[viewName];
            
            // this._unloadCurrentView();  
            
            // var region, widgetCtor, settings;            
            // for (region in view) {
            //     widgetCtor = view[region].widget;
            //     settings = view[region].settings;
            //     var widget = widgetCtor(lang.mixin(settings, params));
                
            //     widget.region = region;
            //     this._container.addChild(widget);
                
            //     this._currentViewWidgets.push(widget);
            // }

            var specToLoad = {};
            specToLoad[viewName] = this._viewSpecsHash[viewName];

            when(rootContext, function (rootContext) {
                when(rootContext.wire(specToLoad), function (loadedViewSpec) {
                    widget = loadedViewSpec[viewName].view;
                    widget.region = "center";
                    this._container.addChild(widget);
                }.bind(this));
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