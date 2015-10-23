var app = angular.module('SecretSanta', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('green');
});

var AppController = app.controller('AppCtrl', ['$scope', function($scope) {
  var vm = this;

  vm.person = {
    name: ''
  };

  vm.addPerson = function() {
    vm.people.push(vm.person);
    vm.person = {
      name: ''
    };
  }

  vm.people = [];
}]);
