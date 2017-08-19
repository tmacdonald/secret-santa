app.controller('ResultsCtrl', ['ParticipantsService', 'RelationshipsService', 'ResultsService',
  function(participantsService, relationshipsService, resultsService) {
  var vm = this;
  vm.results = resultsService.get();

  vm.generate = function() {
    var participants = participantsService.get();
    var relationships = relationshipsService.getAll();
    vm.results = resultsService.generate(participants, relationships);
  };

  vm.checkResult = function() {
    vm.result = vm.results[vm.name];
  };

  vm.clearResult = function() {
    vm.name = '';
    vm.result = undefined;
  }

  vm.persistResults = function() {
    for (var prop in vm.results) {
      if (vm.results.hasOwnProperty(prop)) {
        var participantRelationships = relationshipsService.get(prop);
        participantRelationships.push(vm.results[prop]);
        relationshipsService.set(prop, participantRelationships);
      }
    }

    vm.results = {};
    resultsService.set(vm.results);
  }
}]);
