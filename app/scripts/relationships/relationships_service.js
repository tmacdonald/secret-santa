app.factory('RelationshipsService', ['localStorageService', function(localStorageService) {
  var service = {
    get: function(name) {
      var relationships = localStorageService.get('relationships') || {};
      return relationships[name] || [];
    },

    getAll: function() {
      var relationships = localStorageService.get('relationships') || {};
      return relationships;
    },

    set: function(name, individualRelationships) {
      var relationships = localStorageService.get('relationships') || {};
      relationships[name] = individualRelationships;
      localStorageService.set('relationships', relationships);
    }
  };

  return service;
}]);
