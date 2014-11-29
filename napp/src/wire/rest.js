define([
    "napp/patch/JsonRestStore",
    "dojo/store/Cache",
    "dojo/store/Memory",
    "dojo/store/Observable"
], function (
    JsonRestStore,
    Cache,
    MemoryStore,
    Observable) {

    return function(options) {
        return {
            resolvers: {
                rest: function(resolver, refName, refObj, wire) {
                    var cacheStore = new MemoryStore();
                    var restStore = new JsonRestStore({
                        target: refName
                    });

                    var store = Observable(Cache(restStore, cacheStore));

                    resolver.resolve(store);
                }
            }
        }
    }
});