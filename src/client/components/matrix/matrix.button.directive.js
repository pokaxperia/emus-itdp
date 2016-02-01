(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function GoToModality($log, $location, $compile, $state){
		var getId;
		return {
			restrict: 'E',
			compile: function compile(tElement, tAttrs, transclude) {
				return {
					post: function postLink(scope, iElement, iAttrs, controller) {
						var uiSrefElem = angular.element('<button class="btn btn-md btn-landing1 matrix-body--button js-go-to-modality">EXPLORAR MODALIDAD</button>');
						iElement.append(uiSrefElem);
						iElement.bind('click', function(){
							getId = uiSrefElem[0].attributes[1].value;
							$state.go('modalidades.tipo',{'tipo':getId});
						});
					}
				};
			}
		};
	}

	GoToModality.$inject = ['$log', '$location', '$compile','$state'];

	angular.module('emus.matrix.button.directive', [])
		.directive('jsModality', GoToModality);
}());