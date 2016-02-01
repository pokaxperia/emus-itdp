(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function MoreDescription($log){
		var currentDescription, previousDescription;

		return {
			restrict: 'A',
			scope: {
				id: '=moreDescription'
			},
			link: function(scope, element, attrib){
				element.bind('click', function(){

					previousDescription = currentDescription;
					currentDescription = angular.element(document.getElementById(scope.id));

					angular.equals(previousDescription,currentDescription) ? [previousDescription = "", currentDescription.addClass('more')] : currentDescription.addClass('more');
				
					if(previousDescription){
						!currentDescription ? [currentDescription.removeClass('more'), currentDescription = ""] : previousDescription.removeClass('more');
					}
				});
			}
		};
	}

	MoreDescription.$inject = ['$log'];

	angular.module('emus.modality.more.directive', [])
		.directive('moreDescription', MoreDescription);
}());