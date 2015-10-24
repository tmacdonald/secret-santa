var ParticipantsController = app.controller('ParticipantsCtrl', ['ParticipantsService', function(service) {
  var vm = this;

  vm.participants = service.get('participants') || [];

  vm.newParticipant = {
    name: ''
  };

  vm.addParticipant = function() {

    vm.participants.push(vm.newParticipant);
    service.set(vm.participants);

    vm.newParticipant = {
      name: ''
    };
  };

  vm.removeParticipant = function(index) {
    vm.participants.splice(index, 1);
    service.set('participants', vm.participants);
  }
}]);
