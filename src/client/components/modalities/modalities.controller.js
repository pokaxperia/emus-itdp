(function(){
	/*
	* Modality Module
	*/
	'use strict';

	var ModalitiesController = function($document,$scope,$window,$state){

		$document.duScrollTo(top, 0);

		var menuClick = angular.element(document.getElementById('menu'));
		var aboutLanding = angular.element(document.getElementsByClassName('about-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			aboutLanding.toggleClass('show_menu');
		});
		
		$document.on("scroll", function() {
			var header = angular.element(document.getElementById('header'));
			if($document.scrollTop() >= 65){
				header.addClass('black');
			}
			else{
				header.removeClass('black');
			}
		});

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