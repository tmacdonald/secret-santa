app.controller('ResultsCtrl', ['ParticipantsService', 'RelationshipsService', 'ResultsService',
  function(participantsService, relationshipsService, resultsService) {
  var vm = this;

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
}]);
