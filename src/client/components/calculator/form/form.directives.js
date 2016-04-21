(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function KlDirective(){
		
		var template = '<input type="number" class="form-control" ng-change="getKlValue(calculator.KmEvaluables)" placeholder="ejemplo: 00.00" step="0.01" required>';
		
		return {
			restrict: 'EA',
			template: template,
			require: 'ngModel',
			replace: true
			/*link: function(scope, element, attrs, ctrl){
				ctrl.$viewChangeListeners.push(function() {
				  scope.$eval(attrs.ngChange);
				});
			}*/
		};
	}

/*	KlController.$inject = ['$timeout', '$log', '$scope'];

	function KlController($timeout, $scope, $log){
		$scope.getklValue = function(data){
			console.log(data);
		}
	}*/
	
	
	angular.module('emus.form.directives', [])
		.directive('kilometerField', KlDirective);
}());