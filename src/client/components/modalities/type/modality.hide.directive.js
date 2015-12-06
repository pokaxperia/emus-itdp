(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function HideDescription($log){
		var currentDescription;

		return {
			restrict: 'A',
			scope: {
				closeId: '=hideDescription'
			},
			link: function(scope, element){
				element.bind('click', function(){
					currentDescription = angular.element(document.getElementById(scope.closeId));
					currentDescription.removeClass('more');
				});
			}
		};
	}

	HideDescription.$inject = ['$log'];

	angular.module('emus.modality.hide.directive', [])
		.directive('hideDescription', HideDescription);
}());