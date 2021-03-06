'use strict';

angular.module('treeSelect')
	.factory('Tree', function() {
		
		var Node = function(node, children, value) {
			this.parent = node;
			this.children = children;
			this.value = value;

			// Set non selected if not specified
			if (value !== null && typeof value === 'object') {
				if (value.selected === undefined) {
					value.selected = false;
				}
			}
		};

		function createNode(parent, value) {
			return new Node(parent, [], value);
		}

		function addChild(tree, value) {
			var node = createNode(tree, value);
			tree.children.push(node);
			
			return node;
		};

		function getChildren(node) {
			return node.children;
		};

		return {
			create: function() {
				return new Node(null, [], null);
			},
			addChild: addChild,
			getChildren: getChildren
		};
	})

	.factory('TreeHelper', function(Tree) {
		function traverseTree(tree, callback, lvl) {
			var children = Tree.getChildren(tree);
			for (var i in children) {
				var elem = children[i];
				if (elem.children.length > 0) {
					callback(elem, lvl);
					traverseTree(elem, callback, lvl + 1);
				} else {
					callback(elem, lvl);
				}
			}
		}

		function decorateElement(element, lvl) {
			return {
				nameWeb: element.value.nameWeb,
				selected: element.value.selected || false,
				node: element,
				lvl: lvl
			};
		}

		function flattenTree(tree) {
			if ( ! tree) {
				return [];
			}
			
			var flatTree = [];
			
			traverseTree(tree, function(element, lvl) {
				flatTree.push(decorateElement(element, lvl));
			}, 1);

			return flatTree;
		}

		function allTree(tree, fn) {
			var isTrue = true;
			
			traverseTree(tree, function(element, lvl) {
				isTrue = isTrue && fn(element.value);
			});

			return isTrue;
		}

		function mapTree(tree, fn) {
			// If not "global" root (which does not have value)
			// then apply to first element as well.
			if (tree.parent !== null) {
				fn(tree.value);
			}
			traverseTree(tree, function(element, lvl) {
				fn(element.value);
			});
		}

		function toJson(tree) {
			var parentCpy = [];			
			traverseTree(tree, function(element, lvl) {
				parentCpy.push(element.parent);
				element.parent = null;
			});
			var json = JSON.stringify(tree);

			parentCpy = parentCpy.reverse();
			traverseTree(tree, function(element, lvl) {
				element.parent = parentCpy.pop(element.parent);
			});
			
			return json;
		}

		return {
			flattenTree: flattenTree,
			mapTree: mapTree,
			allTree: allTree,
			toJson: toJson
		};
	})
;
