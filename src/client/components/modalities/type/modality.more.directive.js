(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function MoreDescription($log){
		var currentDescription, previousDescription, closeDescription;

		return {
			restrict: 'A',
			scope: {
				id: '=moreDescription'
			},
			link: function(scope, element, attrib){
				element.bind('click', function(){
					previousDescription = currentDescription;

					currentDescription = angular.element(document.getElementById(scope.id));
					currentDescription.addClass('more');
					
					if(previousDescription){
						!currentDescription ? currentDescription.removeClass('more') : previousDescription.removeClass('more');
					}
				});
			}
		};
	}

	MoreDescription.$inject = ['$log'];

	angular.module('emus.modality.more.directive', [])
		.directive('moreDescription', MoreDescription);
}());