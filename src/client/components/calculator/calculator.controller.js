(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var CalculatorController = function($timeout, $modal, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope){ 
		var state = $rootScope.$state.current.name;
		var area,
		valores,
		typeProyect,
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
		var getArea = sessionStorage.getItem('area');
		var getState = sessionStorage.getItem('state');

		if (state === 'modalidades.calculadora.formulario') {
			if (getState === null && getArea === null || getState === null && getArea === 'false') {
				Modal();
			}
		}

		function Modal(){
			return $timeout(function(){
				$modal.open({
					templateUrl: './components/calculator/type/modal.html',
					controller: ModalController
				});
			}, 1500);
		};

		function ModalController($scope, $modalInstance){
			if(getArea){
				$scope.area = JSON.parse(getArea);
			}
			$scope.estados = [
				"Aguascalientes",
				"Baja California",
				"Baja California Sur",
				"Campeche",
				"Chiapas",
				"Chihuahua",
				"Coahuila",
				"Colim",
				"Distrito Federal",
				"Durango",
				"Estado de México",
				"Guanajuato",
				"Guerrero",
				"Hidalgo",
				"Jalisco",
				"Michoacán",
				"Morelos",
				"Nayarit",
				"Nuevo León",
				"Oaxac",
				"Puebl",
				"Querétaro",
				"Quintana Roo",
				"San Luis Potosí",
				"Sinaloa",
				"Sonora",
				"Tabasco",
				"Tamaulipas",
				"Tlaxcala",
				"Veracruz",
				"Yucatán",
				"Zacatecas"
			];
			$scope.saveArea = function () {
					sessionStorage.setItem('state', 'true');
					area = JSON.stringify($scope.area);
					sessionStorage.setItem('area', area);
					$modalInstance.close();
					return enviar();
			};
			
			$scope.notYet = function () {
				sessionStorage.setItem('state', 'false');
				$modalInstance.dismiss();
			};
		}
		
		var enviar = function(){
			var enviarDatos = JSON.parse(sessionStorage.getItem('setQuote'));
			console.log(enviarDatos);
			return enviarFormulario(enviarDatos);
		}
		
		$scope.calculator = {};
		if (!$scope.calc) {
			$scope.calc = {
				"bicie": 0
			};
		}

		if (!valorBicie) {
			$scope.calc.bicie = JSON.parse(valorBicie);
		};
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
			typeProyect = type.infraestructura;
			toggleFunction(typeProyect);
			$log.info("sessionStorage not empty");
			
			if(type){
				switch(typeProyect){
					case "Ciclovia":
						$scope.calculator.tipo_calle = "Primaria";
						break;
					case "Ciclocarril":
						$scope.calculator.tipo_calle = "Secundaria";
						break;
					case "Busbici":
						$scope.calculator.tipo_calle = "Primaria";
						break;
				}
			}

			valores = JSON.stringify($scope.calculator);
			sessionStorage.setItem('setQuote',valores);
			$state.go('modalidades.calculadora.formulario');
			
			function toggleFunction(typeProyect){
				var imgProject = angular.element(document.getElementById(typeProyect));
				console.log(imgProject);
			}
			
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
			var getState = sessionStorage.getItem('state');
			if (calculatorForm.$valid === true) {
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('setQuote',valores);
				if (getState === 'false') {
					$log.info("Lanzar Modal");
					Modal();
				}
				else{
					$log.info("Modal sin lanzar");
					enviarFormulario(calculator);
				}
			}
			else{
				$log.info("False");
			}
		};
		
		var enviarFormulario = function(calculator){
			$log.info('Enviando formulario');
			SendQuote.sendQuote(calculator).
			then(function(data){
				if(data){
					$log.info("Ok");
				}
			}, function(error){
				$log.error("Error: " + error);
			});
		};
	};

	CalculatorController.$inject = ['$timeout',  '$modal', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope'];

	angular.module('emus.calculator', []).
	controller('CalculatorController', CalculatorController);
}());