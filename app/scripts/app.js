var app = angular.module('SecretSanta', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('green');
});

var AppController = app.controller('AppCtrl', ['$scope', function($scope) {
  var vm = this;

  vm.people = [{
    name: 'Tim',
    newMessage: true
  }, {
    name: 'Remi',
  }, {
    name: 'Sicco',
    newMessage: true
  }];
}]);
