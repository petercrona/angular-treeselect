'use strict';

angular.module('multiselectDialog')
	.directive('multiselectDialog', function(Tree, TreeHelper) {
		return {
			restrict: 'E',
			templateUrl: 'scripts/multiselect-dialog/views/multiselect-dialog.html',
			scope: {
				treeData: '=',
				selected: '=',
				saveHandler: '&',
				metaFields: '=',
				onlyLeafNodes: '@',
				itemsName: '@'
			},
			link: function(scope) {
			
				function checkParentsSelect(tree) {
					if (tree.parent.value !== null) { // Don't do this for top level
						var isSelected = function(x) {
							return x.selected;
						};
						var isDeselected = function(x) {
							return ! x.selected;
						};
						
						// All nodes are selected, then select parent as well
						if (TreeHelper.allTree(tree.parent, isSelected)) {
							tree.parent.value.selected = true;
						}

						// All nodes are deselected, desselect parent as well
						if (TreeHelper.allTree(tree.parent, isDeselected)) {
							tree.parent.value.selected = false;
						}

						// Proceed upwards to root
						if (tree.parent !== null) {
							checkParentsSelect(tree.parent);
						}
					}
				}

				function selectAll(tree) {
					var setSelectTo;
					if (tree.selected) {
						setSelectTo = false;
					} else {
						setSelectTo = true;
					}
					
					// Select/Deselect all elements of tree
					TreeHelper.mapTree(tree.node, function(x) {
						x.selected = setSelectTo;
						return x;
					});

					// What if the parent does not have any selected anymore,
					// then we need to deselect it (same for all selected)
					checkParentsSelect(tree.node);

					updateTreeInScope(scope, scope.treeData);
				}

				function updateTreeInScope(scope, tree) {
					scope.tree = TreeHelper.flattenTree(tree);
				}

				function setSelected(tree, selected) {
					var selectedIndex = {};
					selected.forEach(function(x) {
						selectedIndex[x] = true;
					});
					
					// Deselect all
					tree.forEach(function(x) {
						x.selected = false;
					});
					
					// Select those specified
					var selectedElems = tree.filter(function(x) {
						return selectedIndex[x.node.value.value] === true;
					});
					selectedElems.forEach(function(x) {
						selectAll(x);
					});
				}

				function mySaveHandler(tree, meta) {
					if (scope.saveHandler) {

						var selected = tree.filter(function(x) {return x.selected});
						
						if (scope.onlyLeafNodes === 'true') {
							selected = selected.filter(function(x) {
								return x.node.children.length === 0;
							});
						}

						var values = selected.map(function(x) { return x.node.value; });
						
						scope.saveHandler({
							tree: values, 
							metaFields: meta
						});
					}
				}

				scope.selectAll = selectAll;
				scope.mySaveHandler = mySaveHandler;
				scope.meta = {};

				// Make sure directive stays in sync
				scope.$watch('treeData', function(newVal) {
					updateTreeInScope(scope, newVal);
				});

				scope.$watch('selected', function(newVal) {
					setSelected(scope.tree, newVal);
				});

			}
			
		}
	})
;
