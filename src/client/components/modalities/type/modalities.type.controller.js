(function(){
	/*
	* Modality Type Controller
	*/
	'use strict';

	var ModalityTypeController = function($log, $scope, $rootScope, $stateParams, $state, ModalityFactory){
		var type_modality = $stateParams.tipo;
		var prevDesc, modDesc, currentDesc, closeCurrent;

		$scope.showDescription = function(indice){
			prevDesc = modDesc;
			currentDesc = angular.element(document.getElementById(indice));
			if(prevDesc){
				!currentDesc ? currentDesc.removeClass('more') : prevDesc.removeClass('more');
			}
			toggleDesc(indice);
			currtClose(currentDesc);
		}; 

		function toggleDesc(indice){
			modDesc = angular.element(document.getElementById(indice));
			modDesc.addClass('more');
		}
		
		function currtClose(close){
			closeCurrent = close[0].lastElementChild;
			closeCurrent.addEventListener('click', function(){
				currentDesc.removeClass('more');
			});
		}

		ModalityFactory.getModality(type_modality).
		then(function(result){
			$scope.set_m = result;
		}, function(error){
			$log.error(error);
		});

	};
	
	ModalityTypeController.$inject = ['$log', '$scope', '$rootScope', '$stateParams', '$state','ModalityFactory'];
	
	angular.module('emus.modalities.type', []).
	controller('ModalityTypeController', ModalityTypeController);

}());