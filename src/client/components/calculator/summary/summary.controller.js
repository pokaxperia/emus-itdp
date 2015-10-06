(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var SummaryController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope, Mun){
		var ctrl = this;
		var setResults;
		init();
		
		function init(){
			$scope.first = {
				open: true
			}
			
			setResults = JSON.parse(sessionStorage.getItem('results'));
			
			if(setResults){
				setResults(setResults);
			}
			
		}

		function setResults(data){
			var first = data.ingresos.estatales;
			var second = data.ingresos.municipales;
			var third = data.egresos.estatales;
			var fourth = data.egresos.municipales;
			$scope.own = data.options;
			$scope.result = data;
			
			
			function firstChart(){
				
			}
			var firstdiv = AmCharts.makeChart("firstdiv", {
				"type": "pie",
				"startDuration": 0,
				 "theme": "light",
				"addClassNames": true,
				"legend":{
				 	"position":"bottom",
				  "marginRight":100,
				  "autoMargins":true
				},
				"innerRadius": "5%",
				"defs": {
				  "filter": [{
				    "id": "shadow",
				    "width": "200%",
				    "height": "200%",
				    "feOffset": {
				      "result": "offOut",
				      "in": "SourceAlpha",
				      "dx": 0,
				      "dy": 0
				    },
				    "feGaussianBlur": {
				      "result": "blurOut",
				      "in": "offOut",
				      "stdDeviation": 5
				    },
				    "feBlend": {
				      "in": "SourceGraphic",
				      "in2": "blurOut",
				      "mode": "normal"
				    }
				  }]
				},
				"dataProvider": [first],
				"valueField": "litres",
				"titleField": "country",
				"export": {
				  "enabled": true
				},
				"responsive": {
					"enabled": true
				},
				legend: {
				  divId: "legenddiv"
				},
				"titles": [
						{
							"text": "Chart Title",
							"size": 15
						}
					]
			});
			firstdiv.addLegend(legend, "legenddiv");

		}
		/*function setCharts(data){
			$scope.egresosEstatales = data.egresos.estatales;
			$scope.egresosMunicipales = data.egresos.municipales;
			$scope.ingresosEstatales = data.ingresos.estatales;
			$scope.ingresosMunicipales = data.ingresos.municipales;
			//First chart
			$scope.eMun = $timeout(function(){
				return {
					data: egresosMunicipales,
					type: 'pie',
					theme: 'black'
				}
			},1000);
		}
		*/
	};

	SummaryController.$inject = ['$document','$timeout',  '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope', 'Mun'];

	angular.module('emus.summary', [])
		.controller('SummaryController', SummaryController);
}());