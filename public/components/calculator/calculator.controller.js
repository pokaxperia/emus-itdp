	/**
	*  Calculator Module
	*/
(function(){
	'use strict';

	var CalculatorController = function($scope,$location, $state, $log, $filter, SendQuote){

		$scope.calculator = {};
		var typeProyect,
		pozosValue,
		parsePozosValue,
		rejillasValue,
		parseRejillasValue,
		cocherasValue,
		parseCocherasValue,
		bicieValue,
		parseBicieValue;

		var getQuote = sessionStorage.getItem('setQuote');
		var flagPozos = sessionStorage.getItem('flagPozos');
		var flagRejillas = sessionStorage.getItem('flagRejillas');
		var flagCocheras = sessionStorage.getItem('flagCocheras');
		var flagBiciE = sessionStorage.getItem('flagBiciE');

		if(getQuote  !== null){
			$scope.calculator = JSON.parse(getQuote);
			$log.info("sessionStorage not empty");
			if (flagPozos == 'true') {
				$scope.flagPozos = true;
			}
			else{
				$scope.flagPozos = false;
			}
			if (flagRejillas == 'true') {
				$scope.flagRejillas = true;
			}
			else{
				$scope.flagRejillas = false;
			}
			if (flagRejillas == 'true') {
				$scope.flagRejillas = true;
			}
			else{
				$scope.flagRejillas = false;
			}
			if (flagCocheras == 'true') {
				$scope.flagCocheras = true;
			}
			else{
				$scope.flagCocheras = false;
			}
			if (flagBiciE == 'true') {
				$scope.flagBiciE = true;
			}
			else{
				$scope.flagBiciE = false;
			}
		}

		
/*	if(Object.keys($scope.calculator).length === 0){
			$log.warn("Calculator object value: " +Object.keys($scope.calculator).length);
			if(getQuote === null){
				$log.warn("sessionStorage empty");
				sessionStorage.clear();
				$log.info("Cleaning sessionStorage");
			}
			else{
				
				$log.info("sessionStorage not empty");
				var quotes = JSON.parse(getQuote);
				$scope.calculator = quotes;
				if (bandera == 'true') {
					$scope.bandera = true;
				}
			}
		}*/

		/* Type of project options */
		$scope.getType = function(type){
			$log.info("sessionStorage not empty");
			typeProyect = type.infraestructura;
			if(type){
				switch($scope.calculator.infraestructura){
					case "Ciclovia":
						$scope.calculator.tipo_calle = "Primaria";
						break;
					case "Ciclocarril":
						$scope.calculator.tipo_calle = "Secundaria";
						break;
					case "Bus-bici":
						$scope.calculator.tipo_calle = "Primaria";
						break;
				}
			}

			var valores = JSON.stringify($scope.calculator);
			sessionStorage.setItem('setQuote',valores);
			$state.go('modalidades.calculadora.formulario');
		};

		/* Start Pozos field */
		if (flagPozos == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					sessionStorage.setItem('flagPozos','true');
					$scope.flagPozos = true; 

					pozosValue = parseInt((newValue * 1000) / 200);
					parsePozosValue = parseInt($filter('number')(pozosValue, 0));
					$scope.calculator.PozosProyecto = parsePozosValue;
					$scope.default_pozos = $scope.calculator.PozosProyecto;

			});
		}
		// Automatic calculation
		$scope.getPozosAuto = function(valor){
			sessionStorage.setItem('flagPozos','true');
			$scope.flagPozos = true;

			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				pozosValue = parseInt((newValue * 1000) / 200);
				parsePozosValue = parseInt($filter('number')(pozosValue, 0));
				$scope.calculator.PozosProyecto = parsePozosValue;
				$scope.default_pozos = $scope.calculator.PozosProyecto;
			});
		};

		// Manual input
		$scope.getPozosCustom = function(){
			sessionStorage.setItem('flagPozos','false');
			$scope.flagPozos = false;
			$scope.$watch( 'calculator.PozosProyecto', function(newValue, oldValue){
				$scope.custom_pozos = newValue;
			});
		};
		/* End Pozos field */

		/* Start Rejillas field */
		if (flagRejillas == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					sessionStorage.setItem('flagRejillas','true');
					$scope.flagRejillas = true; 

					rejillasValue = parseInt(newValue * 25);
					parseRejillasValue = parseInt($filter('number')(rejillasValue, 0));
					$scope.calculator.RejillasProyecto = parseRejillasValue;
					$scope.default_rejillas = $scope.calculator.RejillasProyecto;
					
			});
		}

		// Automatic calculation
		$scope.getRejillasAuto = function(valor){
			sessionStorage.setItem('flagRejillas','true');
			$scope.flagRejillas = true;

			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				$scope.calculator.RejillasProyecto = parseInt(newValue * 25);
				$scope.default_rejillas = $scope.calculator.RejillasProyecto;
			});
		};

		// Manual input
		$scope.getRejillasCustom = function(){
			sessionStorage.setItem('flagRejillas','false');
			$scope.flagRejillas = false;
			$scope.$watch( 'calculator.RejillasProyecto', function(newValue, oldValue){
				$scope.custom_rejillas = newValue;
			});
		};
		/* End Rejillas field */

		/* Start Cocheras field */
		if (flagCocheras == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					sessionStorage.setItem('flagCocheras','true');
					$scope.flagCocheras = true; 

					cocherasValue = parseInt(newValue * 25);
					parseCocherasValue = parseInt($filter('number')(cocherasValue, 0));
					$scope.calculator.Cocheras = parseCocherasValue;
					$scope.default_cocheras = $scope.calculator.Cocheras;
					
			});
		}

		// Automatic calculation
		$scope.getCocherasAuto = function(valor){
			sessionStorage.setItem('flagCocheras','true');
			$scope.flagCocheras = true;

			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				$scope.calculator.Cocheras = parseInt(newValue * 25);
				$scope.default_cocheras = $scope.calculator.Cocheras;
			});
		};

		// Manual input
		$scope.getCocherasCustom = function(){
			sessionStorage.setItem('flagCocheras','false');
			$scope.flagCocheras = false;
			$scope.$watch( 'calculator.Cocheras', function(newValue, oldValue){
				$scope.custom_cocheras = newValue;
			});
		};
		/* End Cocheras field */

		/* Start Biciestacionamientos field */
		if (flagBiciE == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					sessionStorage.setItem('flagBiciE','true');
					$scope.flagBiciE = true; 

					bicieValue = parseInt( ((newValue * 1000) / 300) * 4 * 479.33 );
					parseBicieValue = parseInt($filter('number')(bicieValue, 0));
					$scope.calculator.Biciestacionamientos = parseBicieValue;
					$scope.default_bicie = $scope.calculator.Biciestacionamientos;

			});
		}

		// Automatic calculation
		$scope.getBiciEAuto = function(valor){
			sessionStorage.setItem('flagBiciE','true');
			$scope.flagBiciE = true;

			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				$scope.calculator.Biciestacionamientos = parseInt(((newValue * 1000) / 300) * 4 * 479.33);
				$scope.default_bicie = $scope.calculator.Biciestacionamientos;
			});
		};

		// Manual input
		$scope.getBiciECustom = function(){
			sessionStorage.setItem('flagBiciE','false');
			$scope.flagBiciE = false;
			$scope.$watch( 'calculator.Biciestacionamientos', function(newValue, oldValue){
				$scope.custom_bicie = newValue;
			});
		};
		/* End Biciestacionamientos field */

		/* Submit Form */
		$scope.saveQuote = function(calculatorForm, calculator){
			if (calculatorForm.$valid === true) {
				$scope.calculatorForm.submitted = true;
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('setQuote',valores);
				SendQuote.sendQuote(valores).
				then(function(data){
					$log.info(data);
				}, function(error){
					$log.error(error);
				});
			}
		};

	};

	CalculatorController.$inject = ['$scope','$location', '$state', '$log', '$filter','SendQuote'];

	angular.module('emus.calculator', []).
	controller('CalculatorController', CalculatorController);
}());