'use strict';

/**
 * @ngdoc overview
 * @name multiselectDialogApp
 * @description
 * # multiselectDialogApp
 *
 * Main module of the application.
 */
angular
  .module('multiselectDialogApp', [
    'ngRoute',
    'ngTouch',
	'multiselectDialog',
	'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
