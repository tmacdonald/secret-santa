var ParticipantsController = app.controller('ParticipantsCtrl', ['localStorageService', function(localStorageService) {
  var vm = this;

  vm.people = localStorageService.get('participants') || [];

  vm.person = {
    name: ''
  };

  vm.addPerson = function() {

    vm.people.push(vm.person);
    localStorageService.set('participants', vm.people);

    vm.person = {
      name: ''
    };
  };

  vm.removePerson = function(index) {
    vm.people.splice(index, 1);
    localStorageService.set('participants', vm.people);
  }
}]);
