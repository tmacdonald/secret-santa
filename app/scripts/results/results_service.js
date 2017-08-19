app.factory('ResultsService', ['ElfService', 'localStorageService', function(elf, localStorageService) {
  var service = {
    generate: function(participants, relationships) {
      var results = elf(participants, relationships);
      localStorageService.set('results', results);
      return results;
    },

    get: function() {
      return localStorageService.get('results');
    },

    set: function(results) {
      localStorageService.set('results', results);
    }
  };

  return service;
}])
