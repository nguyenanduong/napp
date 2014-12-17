define([
    "dcl",
    "dojo/_base/lang",
    "dojo/promise/all",
    "dojo/Deferred",
    "dojo/hash",
    "dojo/router",
    "decor/Stateful",
    "dojo/when",
    
    "napp/utils/lang"
], function (
    dcl,
    lang,
    all,
    Deferred,
    hash,
    router,
    Stateful,
    when,
    
    langUtil) {
    
    return dcl([Stateful], {
        viewContainer: null, // Injected
        createViewContext: null, // Injected
        viewsSpec: null, // Injected
        defaultView: null, // Injected

        _viewSpecsHash: null,        
        _currentViewWidget: null,

        initialize: function () {
            router.register(/^([^\?]*)(\?*)(.*)$/, (this, function (evt) {
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

            // TODO: Extract to view loader component
            var viewSpecLoaders = this.viewsSpec.map(function (spec) {
                if (spec.constructor == String) {
                    var d = new Deferred();
                    require ([spec], function (loadedSpec) {
                        d.resolve(loadedSpec);
                    });
                    return d;
                } else if (spec.constructor == Object) {
                    return spec;
                }

                return null;
            });

            when (all(viewSpecLoaders), function (viewsSpecs) {
                this._viewSpecsHash = viewsSpecs.reduce(function (accumulated, item) {
                    return langUtil.deepMixin(accumulated, item);
                }, {});                

                router.startup();
                if (hash() === "") {
                    router.go(this.defaultView);
                }
            }.bind(this));
            
            this.viewContainer.placeAt(this.root);
            this.viewContainer.startup();
        },

        _loadView: function (viewName, params) {
            var specToLoad = {};
            specToLoad[viewName] = this._viewSpecsHash[viewName];

            when(this.createViewContext(specToLoad), function (loadedViewSpec) {
                this._unloadCurrentView();

                widget = loadedViewSpec[viewName].view;
                this.viewContainer.addChild(widget);

                this._currentViewWidget = widget;                
            }.bind(this));
        },
        
        _unloadCurrentView: function () {
            if (this._currentViewWidget) {
                this.viewContainer.removeChild(this._currentViewWidget);
                this._currentViewWidget.destroy();
                this._currentViewWidget = null;
            }      
        }
    });
});