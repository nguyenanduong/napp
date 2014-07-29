define([
    "dojo/store/JsonRest",
    "dojo/store/Cache",
    "dojo/store/Memory",
    "dojo/store/Observable"
], function (
    JsonRest,
    Cache,
    MemoryStore,
    Observable) {

    return function(options) {
        return {
            resolvers: {
                rest: function(resolver, refName, refObj, wire) {
                    var cacheStore = new MemoryStore();
                    var restStore = new JsonRest({
                        target: refName
                    });

                    var store = Observable(Cache(restStore, cacheStore));

                    resolver.resolve(store);
                }
            }
        }
    }
});