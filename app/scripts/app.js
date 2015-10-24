var app = angular.module('SecretSanta', ['LocalStorageModule']);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('secret-santa');
  localStorageServiceProvider.setStorageType('localStorage');
}]);

var AppController = app.controller('AppCtrl', ['localStorageService', function(localStorageService) {
  var vm = this;

  vm.people = localStorageService.get('people') || [];

  vm.person = {
    name: ''
  };

  vm.addPerson = function() {

    vm.people.push(vm.person);
    localStorageService.set('people', vm.people);

    vm.person = {
      name: ''
    };
  };

  vm.removePerson = function(index) {
    vm.people.splice(index, 1);
    localStorageService.set('people', vm.people);
  }
}]);
