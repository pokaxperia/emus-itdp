(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var ModalitiesController = function($scope,$window, $state, $rootScope,$stateParams){
/*		$scope.getBreadcrumbLabel = function(){
			return $rootScope.tipo;
		}*/

		$scope.showModalities = function(){
			if($state.current.name === 'modalidades' || $state.current.name === 'modalidades.tipo'){
				return true;
			}
		}

		var menuClick = angular.element(document.getElementById('menu'));
		var menuLanding = angular.element(document.getElementsByClassName('landing-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			menuLanding.toggleClass('show_menu');
		});
		
		angular.element($window).bind("scroll", function() {
			var header = angular.element(document.getElementById('header'));
			var item = angular.element(document.getElementsByClassName('item'));
			var itemButton = angular.element(document.getElementById('item-button'));
			var body = angular.element(document.getElementsByTagName('body'));
			if(body[0].scrollTop >= 65 && body[0].scrollWidth >= 768){
				header.addClass('black');
				//itemButton.removeClass('btn-landing');
				//itemButton.addClass('btn-landing1');
				
			}
			else{
				header.removeClass('black');
				//itemButton.removeClass('btn-landing1');
				//itemButton.addClass('btn-landing');
			}
		});
	};
	
	ModalitiesController.$inject = ['$scope', '$window', '$state','$rootScope','$stateParams'];
	
	angular.module('emus.modalities', []).
	controller('ModalitiesController', ModalitiesController);

}());