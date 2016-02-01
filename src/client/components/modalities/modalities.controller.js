(function(){
	/*
	* Modality Module
	*/
	'use strict';

	var ModalitiesController = function($document,$scope,$window,$state){

		$document.scrollTop(0);

		$scope.showModalities = function(){
			if($state.current.name === 'modalidades' || $state.current.name === 'modalidades.tipo'){
				return true;
			}
		};

	};
	
	ModalitiesController.$inject = ['$document','$scope','$window','$state'];
	
	angular.module('emus.modalities', []).
	controller('ModalitiesController', ModalitiesController);

}());