/**
* modalityActive Module
*
* Description
*/
angular.module('emus.modality.directive', []).
directive('modalityActive', ['$scope', function($scope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE',
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, elm, attrs) {
			$log.info(scope);
			$log.info(elm);
			$log.info(attrs);
		}
	};
}]);