app.controller('RelationshipsCtrl', ['ParticipantsService', 'RelationshipsService', function(participants, relationships) {
  var vm = this;

  vm.participants = participants.get();
  vm.participant = undefined;
  vm.relationships = [];

  vm.loadParticipantRelationships = function(participant) {
    vm.participant = participant;
    vm.relationships = relationships.get(participant);
  };

  vm.addRelationship = function() {
    // TODO Add validation
    vm.relationships.push(vm.newRelationship);
    relationships.set(vm.participant, vm.relationships);
    vm.newRelationship = '';
  }
}]);
