(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var LandingController = function($scope,$document, $window){
		$document.duScrollTo(top, 0);
		var header, item, itemButton, body;
		var menuClick = angular.element(document.getElementById('menu'));
		var menuLanding = angular.element(document.getElementsByClassName('landing-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			menuLanding.toggleClass('show_menu');
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
	
	LandingController.$inject = ['$scope', '$document', '$window'];
	
	angular.module('emus.landing', []).
	controller('LandingController', LandingController);

}());