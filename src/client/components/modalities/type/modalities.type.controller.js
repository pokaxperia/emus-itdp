(function(){
	/*
	* Modality Type Controller
	*/
	'use strict';

	var ModalityTypeController = function($log, $scope, $rootScope, $stateParams, $state, $timeout,ModalityFactory){
		var type_modality = $stateParams.tipo;
		ModalityFactory.getModality(type_modality).
		then(function(result){
			$timeout(function () {
				if (result.proyectos === false) {
					$scope.mensaje = false;
				}
				$scope.set_m = result;
			}, 1000);
		}, function(error){
			$log.error(error);
		});

	};
	
	ModalityTypeController.$inject = ['$log', '$scope', '$rootScope', '$stateParams', '$state', '$timeout', 'ModalityFactory'];
	
	angular.module('emus.modalities.type', []).
	controller('ModalityTypeController', ModalityTypeController);

}());