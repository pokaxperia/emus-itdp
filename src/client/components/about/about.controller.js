(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var AboutController = function($scope,$document){
		$document.scrollTop(0);

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
	};
	
	AboutController.$inject = ['$scope', '$document'];
	
	angular.module('emus.about', []).
	controller('AboutController', AboutController);

}());