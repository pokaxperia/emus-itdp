(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var LandingController = function($scope,$document,$state){

		$document.scrollTop(0,1000);

		var menuClick = angular.element(document.getElementById('menu'));
		var menuLanding = angular.element(document.getElementsByClassName('landing-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			menuLanding.toggleClass('show_menu');
		});
		
		$document.on("scroll", function() {
			var header = angular.element(document.getElementById('header'));
			var item = angular.element(document.getElementsByClassName('item'));
			var itemButton = angular.element(document.getElementById('item-button'));
			var body = angular.element(document.getElementsByTagName('body'));
			if($document.scrollTop() >= 65){
				header.addClass('black');
			}
			else{
				header.removeClass('black');
			}
		});
	};
	
	LandingController.$inject = ['$scope', '$document','$state'];
	
	angular.module('emus.landing', []).
	controller('LandingController', LandingController);

}());