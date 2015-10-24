var app = angular.module('SecretSanta', ['ngRoute','LocalStorageModule']);

app.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('secret-santa');
  localStorageServiceProvider.setStorageType('localStorage');

  $routeProvider
    .when('/participants', {
      templateUrl: 'templates/participants.html',
      controller: 'ParticipantsCtrl as vm'
    })
    .when('/relationships', {
      templateUrl: 'templates/relationships.html',
      controller: 'RelationshipsCtrl as vm'
    })
    .when('/results', {
      templateUrl: 'templates/results.html',
      controller: 'ResultsCtrl as vm'
    })
    .otherwise({
      redirectTo: '/participants'
    })
}]);
