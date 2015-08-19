	/**
	*  Calculator Module
	*/
(function(){
	'use strict';

	var CalculatorController = function($scope,$location, $state, $log, $filter, SendQuote){

		$scope.calculator = {};
		if (!$scope.calc) {
			$scope.calc = {
				"bicie": 0
			};
		}
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
		var flagBicie = sessionStorage.getItem('flagBicie');
		var valorBicie = sessionStorage.getItem('Bicie');
		$scope.calc.bicie = JSON.parse(valorBicie);
		console.log(getQuote);
		if(getQuote  !== null){
			$scope.calculator = JSON.parse(getQuote);
			
			$log.info("sessionStorage not empty");
			if (flagPozos == 'true') {
				$scope.flagPozos = true;
			}
			else if (flagPozos == 'false') {
				$scope.flagPozos = false;
			}
			else{
				$scope.flagPozos = '';
			}
			if (flagRejillas == 'true') {
				$scope.flagRejillas = true;
			}
			else if (flagRejillas == 'false') {
				$scope.flagRejillas = false;
			}
			else{
				$scope.flagRejillas = '';
			}
			if (flagCocheras == 'true') {
				$scope.flagCocheras = true;
			}
			else if (flagCocheras == 'false') {
				$scope.flagCocheras = false;
			}
			else{
				$scope.flagCocheras = '';
			}
			if (flagBicie == 'true') {
				$scope.flagBicie = true;
			}
			else if (flagBicie == 'false') {
				$scope.flagBicie = false;
			}
			else{
				$scope.flagBicie = '';
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

			}, true);
		}
		// Automatic calculation
		$scope.getPozosAuto = function(valor){
			sessionStorage.setItem('flagPozos','true');
			$scope.flagPozos = true;
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				pozosValue = parseInt((valor * 1000) / 200);
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
			}, true);
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
			}, true);
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
		if (flagBicie == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				sessionStorage.setItem('flagBicie','true');
				$scope.flagBicie = true; 

				bicieValue = ((newValue * 1000) / 300) * 4 * 479.33 ;
				parseBicieValue = Number(bicieValue.toString().match(/^\d+(?:\.\d{0,2})?/));
				$scope.calculator.Biciestacionamientos = parseBicieValue;
				$scope.default_bicie = $scope.calculator.Biciestacionamientos;
			});
		}

		// Automatic calculation
		$scope.getBicieAuto = function(valor){
			if (!$scope.calculator.KmEvaluables) {
				sessionStorage.setItem('flagBicie','undefined');
				$log.error("Ingrese los Kilometros primero");
			}
			else{
				sessionStorage.setItem('flagBicie','true');
				$scope.flagBicie = true;

				$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					bicieValue = ((newValue * 1000) / 300) * 4 * 479.33 ;
					parseBicieValue = Number(bicieValue.toString().match(/^\d+(?:\.\d{0,2})?/));
					console.log(parseBicieValue);
					$scope.calculator.Biciestacionamientos = parseBicieValue;
					$scope.default_bicie = $scope.calculator.Biciestacionamientos;
				});
			}
		};

		// Manual input
		$scope.getBicieCustom = function(){
			sessionStorage.setItem('flagBicie','false');
			$scope.flagBicie = false;
			$scope.$watch('calc.bicie', function(newValue, oldValue){
				sessionStorage.setItem('flagBicie','false');
				$scope.flagBicie = false;
				sessionStorage.setItem('Bicie',JSON.stringify(newValue));
				bicieValue = newValue * 479.33;
				parseBicieValue = Number(bicieValue.toString().match(/^\d+(?:\.\d{0,2})?/));
				$scope.calculator.Biciestacionamientos = parseBicieValue;
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
					$log.info("Result: " + data);
				}, function(error){
					$log.error("Error: " + error);
				});
			}
		};

	};

	CalculatorController.$inject = ['$scope','$location', '$state', '$log', '$filter','SendQuote'];

	angular.module('emus.calculator', []).
	controller('CalculatorController', CalculatorController);
}());