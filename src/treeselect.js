'use strict';

/**
 * This directive can given an array present it as a tree and allow the user to select
 * subsets of this tree.
 */
angular.module('treeSelect', [])

.run(['$templateCache', function($templateCache) {

	$templateCache.put('treeSelectTemplate', '<div class="row">\n<div class="col-md-7">\n<label ng-bind="itemsName"></label>\n<div class="multiselect-tree">\n<div class="checkbox" ng-class="::\'multiselect-tree-lvl\' + elem.lvl" ng-repeat="elem in tree" ng-click="selectAll(elem)">\n<label>\n<input type="checkbox" ng-checked="elem.selected" /> <span ng-bind="elem.nameWeb"></span>\n</label>\n</div>\n</div>\n</div>\n<div class="col-md-5">\n<form ng-submit="mySaveHandler(tree, meta);">\n<div class="form-group" ng-repeat="field in metaFields" ng-include="::\'multiselect-dialog-\'+field.type">\n</div>\n<div class="form-group">\n<button class="btn btn-default" type="submit">Save</button>\n</div>\n</form>\n</div>\n</div>\n<script type="text/ng-template" id="multiselect-dialog-input-text">\n  <div class="form-group">\n	<label ng-bind="field.nameWeb"></label>\n	<input type="text" class="form-control" ng-placeholder="field.placeholder"\n		   ng-model="meta[field.name]" />\n  </div>\n</script>\n<script type="text/ng-template" id="multiselect-dialog-textarea">\n  <div class="form-group">\n	<label ng-bind="field.nameWeb"></label>\n	<textarea class="form-control" \n			  ng-placeholder="field.placeholder"\n			  ng-model="meta[field.name]"></textarea>\n  </div>\n</script>');

}]);
