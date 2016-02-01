(function(){
	/*
	* Matrix Module
	*/
	'use strict';

	var MatrixController = function($document,$scope,$window,$state){

		var header, item, itemButton, body, matrixButton, currentCell;
		currentCell = sessionStorage.getItem('id');
		if (!currentCell) {
			$document.scrollTop(250,800);
		};
		matrixButton = angular.element(document.getElementsByClassName('matrix-grid--item'));
		
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
	
	MatrixController.$inject = ['$document','$scope','$window','$state'];
	
	angular.module('emus.matrix', []).
	controller('MatrixController', MatrixController);

}());