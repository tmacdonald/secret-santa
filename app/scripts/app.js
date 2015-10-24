var app = angular.module('SecretSanta', ['ngRoute','LocalStorageModule']);

app.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('secret-santa');
  localStorageServiceProvider.setStorageType('localStorage');

  $routeProvider
    .when('/participants', {
      templateUrl: 'templates/participants.html',
      controller: 'ParticipantsCtrl as vm'
    })
    .otherwise({
      redirectTo: '/participants'
    })
}]);
