(function(){
	/*
	* Modality Type Controller
	*/
	'use strict';

	var ModalityTypeController = function($log, $scope, $rootScope, $stateParams, $state, $activityIndicator, $timeout,ModalityFactory){
		var type_modality = $stateParams.tipo;
		$activityIndicator.startAnimating();
		ModalityFactory.getModality(type_modality).
		then(function(result){
			$activityIndicator.stopAnimating();
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
	
	ModalityTypeController.$inject = ['$log', '$scope', '$rootScope', '$stateParams', '$state', '$activityIndicator', '$timeout', 'ModalityFactory'];
	
	angular.module('emus.modalities.type', []).
	controller('ModalityTypeController', ModalityTypeController);

}());