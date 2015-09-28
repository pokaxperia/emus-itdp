(function(){
	/*
	* Modality Module
	*/
	'use strict';

	var ModalitiesController = function($document,$scope,$window,$state){
		var mc = this;
		$document.scrollTop(0);
		var header, item, itemButton, body;

		$scope.showModalities = function(){
			if($state.current.name === 'modalidades' || $state.current.name === 'modalidades.tipo'){
				return true;
			}
		};

		var menuClick = angular.element(document.getElementById('menu'));
		var menuLanding = angular.element(document.getElementsByClassName('landing-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			menuLanding.toggleClass('show_menu');
		});
		
		angular.element($window).bind("scroll", function() {
			header = angular.element(document.getElementById('header'));
			body = angular.element(document.getElementsByTagName('body'));
			if(body[0].scrollTop >= 65 && body[0].scrollWidth >= 768){
				header.addClass('black');
			}
			else{
				header.removeClass('black');
			}
		});
	};
	
	ModalitiesController.$inject = ['$document','$scope','$window','$state'];
	
	angular.module('emus.modalities', []).
	controller('ModalitiesController', ModalitiesController);

}());