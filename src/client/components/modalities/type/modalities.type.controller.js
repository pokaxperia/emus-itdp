(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var ModalitiesTypeController = function($scope, $rootScope, $stateParams, $state){
/*		$rootScope.$on('$stateChangeStart', function(toState){
			console.log(toState.$state)
			$scope.step.link1 = $rootScope.$stateParams.tipo;
		});*/
		

	};
	
	ModalitiesTypeController.$inject = ['$scope', '$rootScope', '$stateParams', '$state'];
	
	angular.module('emus.modalities.type', []).
	controller('ModalitiesTypeController', ModalitiesTypeController);

}());