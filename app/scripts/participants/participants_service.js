app.factory('ParticipantsService', ['localStorageService', function(localStorageService) {
  var service = {
    get: function() {
      return localStorageService.get('participants') || [];
    },

    set: function(participants) {
      localStorageService.set('participants', participants);
    }
  };

  return service;
}]);
