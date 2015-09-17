(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var CalculatorController = function($timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope){ 
		var state = $rootScope.$state.current.name;
		var actualProject,
		area,
		areaData,
		areaProject,
		bicieValue,
		cocherasValue,
		flagBicie,
		flagCocheras,
		flagPozos,
		flagRejillas,
		getArea,
		getProject,
		getQuote,
		getState,
		imgProject,
		parseBicieValue,
		parseCocherasValue,
		parsePozosValue,
		parseRejillasValue,
		pozosValue,
		previousProject,
		rejillasValue,
		typeProject,
		valorBicie,
		valores;

		getQuote = sessionStorage.getItem('setQuote');
		flagPozos = sessionStorage.getItem('flagPozos');
		flagRejillas = sessionStorage.getItem('flagRejillas');
		flagCocheras = sessionStorage.getItem('flagCocheras');
		flagBicie = sessionStorage.getItem('flagBicie');
		valorBicie = sessionStorage.getItem('Bicie');
		getArea = sessionStorage.getItem('area');
		getState = sessionStorage.getItem('state');
		getProject = sessionStorage.getItem('actualProject');
		$scope.k_u = false;

		if (state === 'modalidades.calculadora.formulario') {
			if (getState === null && getArea === null || getState === null && getArea === 'false' || getState === false) {
				Modal();
				$scope.showArea = true;
			}
			else{
				setArea();
			}
		}

		var something = (function(){
			var executed = false;
			if(getProject){
				$timeout(function(){
					if (!executed) {
						executed = true;
						imgProject = angular.element(document.getElementById(getProject));
						imgProject.addClass('radio_active');
					}
				}, 1000);
			}
			else{
				executed = false;
			}
		})();

		function setArea(){
			$timeout(function(){
				getArea = sessionStorage.getItem('area');
				areaData = JSON.parse(getArea);
				areaProject = angular.element(document.getElementById('area'));
				areaProject.bind('click', Modal);
				var area_estado = areaData.estado ? areaData.estado : "sin estado";
				var area_municipio = areaData.municipio ? areaData.municipio : "sin municipio";

				areaProject.text(area_estado + " - " + area_municipio);
			}, 1000);
		}

		function Modal(){
			return $timeout(function(){
				$modal.open({
					templateUrl: './components/calculator/type/modal.html',
					controller: ModalController
				});
			}, 1500);
		}

		function ModalController($scope, $modalInstance){
			if(getArea){
				$scope.area = JSON.parse(getArea);
				$scope.k_u = true;
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
				if (getQuote !== null) {
					sessionStorage.setItem('state', 'true');
					area = JSON.stringify($scope.area);
					sessionStorage.setItem('area', area);
					$modalInstance.close();
					getState = sessionStorage.getItem('state');
					setArea();
					enviar();
				}
				sessionStorage.setItem('state', 'true');
				area = JSON.stringify($scope.area);
				sessionStorage.setItem('area', area);
				$modalInstance.close();
				getState = sessionStorage.getItem('state');
				setArea();
			};
			
			$scope.updateArea = function () {
					sessionStorage.setItem('state', 'true');
					area = JSON.stringify($scope.area);
					sessionStorage.setItem('area', area);
					$modalStack.dismissAll();
					setArea();
			};
			
			$scope.notYet = function () {
				sessionStorage.setItem('state', 'false');
				$modalInstance.dismiss();
			};
		}
		
		var enviar = function(){
			var enviarDatos = JSON.parse(sessionStorage.getItem('setQuote'));
			return enviarFormulario(enviarDatos);
		};
		
		$scope.calculator = {};
		if (!$scope.calc) {
			$scope.calc = {
				"bicie": 0
			};
		}
		if (valorBicie) {
			$scope.calc.bicie = Number(valorBicie.toString());
		}

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

		/* Type of project options */
		$scope.getType = function(type){
			previousProject = imgProject;
			actualProject = angular.element(document.getElementById(typeProject));

			if(previousProject){
				!actualProject ? actualProject.removeClass('radio_active') : previousProject.removeClass('radio_active');
			}

			typeProject = type.infraestructura;
			toggleFunction(typeProject);

			$log.info("sessionStorage not empty");
			if(type){
				switch(typeProject){
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

		};

		function toggleFunction(typeProject){
			imgProject = angular.element(document.getElementById(typeProject));
			imgProject.addClass('radio_active');
			sessionStorage.setItem('actualProject',imgProject[0].id);
			
		}
		

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
		if (flagPozos == 'false') {
			sessionStorage.setItem('flagPozos','false');
			$scope.flagPozos = false;
			$scope.$watch( 'calculator.PozosProyecto', function(newValue, oldValue){
				$scope.custom_pozos = newValue;
			}, true);
		}
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
		/*if (flagBicie == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				sessionStorage.setItem('flagBicie','true');
				$scope.flagBicie = true; 

				bicieValue = ((newValue * 1000) / 300) * 4 * 479.33 ;
				parseBicieValue = Number(bicieValue.toString().match(/^\d+(?:\.\d{0,2})?/));
				$scope.calculator.Biciestacionamientos = parseBicieValue;
				$scope.default_bicie = $scope.calculator.Biciestacionamientos;
			});
		}*/

		// Automatic calculation
		/*$scope.getBicieAuto = function(valor){
			
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
		};*/
		$scope.getBicieAuto = function(valor){
			sessionStorage.setItem('flagBicie','true');
			$scope.flagBicie = true;
			console.log(valor);
			//$scope.default_bicie = $scope.calculator.Biciestacionamientos;
		};
		// Manual input
		
		$scope.getBicieCustom = function(){
			sessionStorage.setItem('flagBicie','false');
			$scope.flagBicie = false;
			if (flagBicie == 'false') {
				$scope.$watch('calc.bicie', function(newValue, oldValue){
					$scope.flagBicie = false;
					sessionStorage.setItem('Bicie', newValue);
					$scope.custom_bicie = newValue;
					$scope.calc.bicie = newValue;
					$scope.calculator.Biciestacionamientos = newValue;
				});
			}
		};

			/*$scope.flagBicie = false;
			sessionStorage.setItem('flagBicie','false');
			$scope.$watch('calc.bicie', function(newValue, oldValue){
				sessionStorage.setItem('Bicie', newValue);
				bicieValue = newValue * 479.33;
				parseBicieValue = Number(bicieValue.toString().match(/^\d+(?:\.\d{0,2})?/));
				$scope.calculator.Biciestacionamientos = newValue;
				$scope.custom_bicie = newValue;
			});
			/*
		};
		
		/* End Biciestacionamientos field */

		/* Submit Form */

		$scope.saveQuote = function(calculatorForm, calculator){
			console.log(calculator);
			var getState = sessionStorage.getItem('state');
			if (calculatorForm.$valid === true) {
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('setQuote',valores);
				if (getState === false || getState === null) {
					$log.info("Lanzando Modal");
					Modal();
				}
				else{
					$log.info("Sin modal");
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
			then(function(result){
				if(result){
					$scope.own = result.options;
					$scope.result = result;
					$state.go('modalidades.calculadora.resumen');
					$log.info("Ok");
				}
			}, function(error){
				$log.error("Error: " + error);
			});
		};
	};

	CalculatorController.$inject = ['$timeout',  '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope'];

	angular.module('emus.calculator', [])
		.controller('CalculatorController', CalculatorController);
}());