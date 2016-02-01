(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function GoToStep($log, $location, $state){
		var phaseUrl, modalityUrl, setStorage, phaseId,phaseName, modalityName;
		return {
			restrict: 'E',
			compile: function compile(tElement, tAttrs, transclude) {
				return {
					post: function postLink(scope, iElement, iAttrs, controller) {
						var uiSrefElem = angular.element('<button class="btn btn-md btn-landing1 matrix-body--button js-go-to-step">EXPLORAR INFORMACIÓN</button>');
						iElement.append(uiSrefElem);
						iElement.bind('click', function(){

							modalityUrl = uiSrefElem[0].attributes[1].value;
							modalityName = uiSrefElem[0].attributes[2].value;
							phaseUrl = uiSrefElem[0].attributes[4].value;
							phaseName = uiSrefElem[0].attributes[5].value;
							
							var phaseModality = {modalityUrl: modalityUrl, modalityName: modalityName, phaseUrl: phaseUrl, phaseName: phaseName}
							
							setStorage = JSON.stringify(phaseModality);
							sessionStorage.setItem('matrix', setStorage);
							$state.go('matriz.paso',{'modalidad':modalityUrl, 'paso': phaseUrl});
						});
					}
				};
			}
		};
	}

	GoToStep.$inject = ['$log', '$location', '$state'];

	angular.module('emus.matrix.step.directive', [])
		.directive('jsStep', GoToStep);
}());