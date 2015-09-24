(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var CalculatorController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope, Mun){ 
		$document.scrollTop(0,1000);
		$scope.calculator = {};
		
		var state = $rootScope.$state.current.name;
		var actualProject,
		area,
		areaData,
		area_estado,
		area_municipio,
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
		valores,
		flags = [];
		init();
		
		function init(){
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
			flags.push("flagPozos","flagRejillas","flagCocheras");
		}

		if (state === 'modalidades.calculadora.formulario') {
			if (getState === null && getArea === null) {
				Modal();
				$scope.showArea = true;
			}
			else{
				setArea();
			}
		}

		var loadSelectedProject = (function(){
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
			getArea = sessionStorage.getItem('area');
			if (getArea) {
				$timeout(function(){
					getArea = sessionStorage.getItem('area');
					areaData = JSON.parse(getArea);
					areaProject = angular.element(document.getElementById('area'));
					areaProject.bind('click', Modal);
					area_estado = areaData.estado ? areaData.estado : "sin estado";
					area_municipio = areaData.municipio ? areaData.municipio : "sin municipio";
					areaProject.text(area_estado + " - " + area_municipio);
				}, 1000);
			}
		}

		function Modal(){
			return $timeout(function(){
				var openModal = $modal.open({
						templateUrl: './components/calculator/type/modal.html',
						controller: ModalController
					});
					openModal.result.then(function(reason){
						// done
					}, function(error){
						// error
					});
				}, 1500);
		}

		function ModalController($scope, $modalInstance){
			if(getArea){
				$scope.area = JSON.parse(getArea);
				$scope.k_u = true;
			}

			$scope.estados = [
				{"estado":"Aguascalientes","cveestado":1},
				{"estado":"Baja California","cveestado":2},
				{"estado":"Baja California Sur","cveestado":3},
				{"estado":"Campeche","cveestado":4},
				{"estado":"Chiapas","cveestado":7},
				{"estado":"Chihuahua","cveestado":8},
				{"estado":"Coahuila","cveestado":5},
				{"estado":"Colima","cveestado":6},
				{"estado":"Distrito Federal","cveestado":9},
				{"estado":"Durango","cveestado":10},
				{"estado":"Guanajuato","cveestado":11},
				{"estado":"Guerrero","cveestado":12},
				{"estado":"Hidalgo","cveestado":13},
				{"estado":"Jalisco","cveestado":14},
				{"estado":"México","cveestado":15},
				{"estado":"Michoacánde Ocampo","cveestado":16},
				{"estado":"Morelos","cveestado":17},
				{"estado":"Nayarit","cveestado":18},
				{"estado":"Nuevo León","cveestado":19},
				{"estado":"Oaxaca","cveestado":20},
				{"estado":"Puebla","cveestado":21},
				{"estado":"Querétaro","cveestado":22},
				{"estado":"Quintana Roo","cveestado":23},
				{"estado":"San Luis Potosí","cveestado":24},
				{"estado":"Sinaloa","cveestado":25},
				{"estado":"Sonora","cveestado":26},
				{"estado":"Tabasco","cveestado":27},
				{"estado":"Tamaulipas","cveestado":28},
				{"estado":"Tlaxcala","cveestado":29},
				{"estado":"Veracruz","cveestado":30},
				{"estado":"Yucatán","cveestado":31},
				{"estado":"Zacatecas","cveestado":32}
			];

			$scope.stateChanged = function(valor){
				Mun.getMun(valor).
				then(function(result){
					if(result){
						console.log(result)
					}
				}, function(error){
					$log.error("Error: " + error);
				});
			}

			$scope.saveArea = function () {
				if (getQuote !== null) {
					sessionStorage.setItem('state', 'true');
					area = JSON.stringify($scope.area);
					sessionStorage.setItem('area', area);
					$modalInstance.close();
					getState = sessionStorage.getItem('state');
					setArea();
					sendForm();
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
		
		var sendForm = function(){
			var sendData = JSON.parse(sessionStorage.getItem('setQuote'));
			return enviarFormulario(sendData);
		};

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
		$scope.getKlValue = function(valor){
			init();
			if (flagPozos == 'true') {
				updateValue(valor);
			}
			
			
		}
		// Automatic calculation
		$scope.getPozosAuto = function(valor){
			sessionStorage.setItem('flagPozos','true');
			$scope.flagPozos = true;
			updateValue(valor);
		}
		function updateValue(valor){
			$timeout(function(){
				pozosValue = parseInt((valor * 1000) / 200);
				parsePozosValue = parseInt($filter('number')(pozosValue, 0));
				$scope.calculator.PozosProyecto = parsePozosValue;
				$scope.default_pozos = $scope.calculator.PozosProyecto;
			},500);
		}
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
		
		/*if (flagRejillas == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				sessionStorage.setItem('flagRejillas','true');
				$scope.flagRejillas = true; 

				rejillasValue = parseInt(newValue * 25);
				parseRejillasValue = parseInt($filter('number')(rejillasValue, 0));
				$scope.calculator.RejillasProyecto = parseRejillasValue;
				$scope.default_rejillas = $scope.calculator.RejillasProyecto;
			}, true);
		}*/

		// Automatic calculation
		/*$scope.getRejillasAuto = function(valor){
			sessionStorage.setItem('flagRejillas','true');
			$scope.flagRejillas = true;
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				$scope.calculator.RejillasProyecto = parseInt(newValue * 25);
				$scope.default_rejillas = $scope.calculator.RejillasProyecto;
			});
		};*/
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
					$document.scrollTop(0,1000);
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

	CalculatorController.$inject = ['$document','$timeout',  '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope', 'Mun'];

	angular.module('emus.calculator', [])
		.controller('CalculatorController', CalculatorController);
}());