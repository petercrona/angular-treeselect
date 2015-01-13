'use strict';

/**
 * @ngdoc function
 * @name multiselectDialogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiselectDialogApp
 */
angular.module('multiselectDialogApp')
  .controller('MainCtrl', function ($scope, $timeout, Tree, TreeHelper, ngDialog) {

	  var myTree = Tree.create();

	  var swe = Tree.addChild(myTree, {
		  nameWeb: 'Sverige',
		  value: 1
	  });

	  var gbg = Tree.addChild(swe, {
		  nameWeb: 'Göteborg',
		  value: 2,
	  });

	  Tree.addChild(gbg, {
		  nameWeb: 'Nordstan',
		  value: 3
	  });

	  Tree.addChild(gbg, {
		  nameWeb: 'Torslanda',
		  value: 4
	  });

	  Tree.addChild(swe, {
		  nameWeb: 'Stockholm',
		  value: 5
	  });

	  Tree.addChild(swe, {
		  nameWeb: 'Halmstad',
		  value: 6
	  });

	  Tree.addChild(myTree, {
		  nameWeb: 'Norge',
		  value: 7,
	  });

	  $timeout(function() {
		  console.log(TreeHelper.toJson(myTree));
	  }, 2000);

	  $scope.treeData = myTree;

	  $scope.saveHandler = function(tree, metaFields) {
		  console.log(tree, metaFields);
		  ngDialog.close();
	  };

	  $scope.metaFields = [
		  {
			  nameWeb: 'Name',
			  name: 'name',
			  type: 'input-text'
		  },
		  {
			  nameWeb: 'Address',
			  name: 'address',
			  type: 'input-text'
		  },
		  {
			  nameWeb: 'Description',
			  name: 'description',
			  type: 'textarea'
		  }
	  ];

	  $scope.openDialog = function() {
		  var miniScope = $scope.$new(true);
		  miniScope.saveHandler = $scope.saveHandler;
		  miniScope.treeData = $scope.treeData;
		  miniScope.metaFields = $scope.metaFields;
		  ngDialog.open({
			  template: 'templateId',
			  className: 'ngdialog-theme-default ngdialog-theme-wide',
			  scope: miniScope
		  });
	  }

  });
