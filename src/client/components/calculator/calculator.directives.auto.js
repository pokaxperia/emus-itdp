(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function WellDirective(){
		
		var template = '<input type="number" ng-value="calculator.PozosProyecto" class="form-control" placeholder="número" disabled ng-if="calculator.PozosProyecto == default_pozos || flagPozos === true" style="top: 15px;position: relative;">';
		
		return {
			restrict: 'EA',
			template: template,
			scope:{
				wellField: '&'
			},
			replace: true,
			link: function(scope, element, attrs, ctrl){
				console.log(ctrl)
				ctrl.$viewChangeListeners.push(function() {
				  scope.$eval(attrs.ngChange);
				});
			}
		}
	}

/*	KlController.$inject = ['$timeout', '$log', '$scope'];

	function KlController($timeout, $scope, $log){
		$scope.getklValue = function(data){
			console.log(data);
		}
	}*/
	
	
	angular.module('emus.calculator.directives.auto', [])
		.directive('wellField', WellDirective);
}());