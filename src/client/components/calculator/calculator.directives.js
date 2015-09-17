(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	function WellsDirectives(){
		
		return {
			restrict: 'EA',
			template: '<input type="number" ng-value="calculator.PozosProyecto" class="form-control" placeholder="número" ng-pattern="/^[0-9]{1,7}$/" disabled ng-if="calculator.PozosProyecto == default_pozos || flagPozos === true" style="top: 15px;position: relative;">',
			link: function(scope, iElement, iAttrs) {
				console.log(iAttrs);
			},
			scope: {
				ngWell:'@'
			},
			controller: WellController
		}
	}

	WellController.$inject = ['$timeout', '$log', '$scope'];

	function WellController($timeout, $scope, $log){
		console.log($scope);
	}
	
	
	angular.module('emus.calculator.directives', [])
		.directive('wellDirective', WellsDirectives);
}());