(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var SummaryController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope, Mun){
		init();
		
		function init(){
			// get tab container
			var container = document.getElementById("tabContainer");
			// set current tab
			var navitem = container.querySelector(".tabs ul li");
			//store which tab we are on
			var ident = navitem.id.split("_")[1];
			navitem.parentNode.setAttribute("data-current",ident);
			//set current tab with class of activetabheader
			navitem.setAttribute("class","tabActiveHeader");

			//hide two tab contents we don't need
			var pages = container.querySelectorAll(".tabpage");
			for (var i = 1; i < pages.length; i++) {
				pages[i].style.display="none";
			}

			//this adds click event to tabs
			var tabs = container.querySelectorAll(".tabs ul li");
			for (var i = 0; i < tabs.length; i++) {
				tabs[i].onclick=displayPage;
			}
		}
	};

	SummaryController.$inject = ['$document','$timeout',  '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope', 'Mun'];

	angular.module('emus.summary', [])
		.controller('SummaryController', SummaryController);
}());