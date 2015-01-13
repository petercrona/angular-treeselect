'use strict';

/**
 * @ngdoc function
 * @name multiselectDialogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiselectDialogApp
 */
angular.module('multiselectDialogApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
