(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var CalculatorController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope, Mun){
		$document.scrollTop(0);

		var state = $rootScope.$state.current.name;
		var area,
		areaData,
		bicieValue,
		cocherasValue,
		currentInfrastructure,
		finalMerge,
		flagBicie,
		flagCocheras,
		flagPozos,
		flagRejillas,
		getArea,
		getInfrastructure,
		getModal,
		getQuote,
		getState,
		imgProject,
		listener,
		loadSelectedProject,
		merg_final,
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
		$scope.resultado = null;
		$scope.calculator = {};
		$scope.area = {estado: "",municipio: ""};
		$scope.form = {};
		$scope.submitted = "";
		$scope.form.PozosProyecto1 = "";
		$scope.form.PozosProyecto2 = "";
		
		flagBicie = sessionStorage.getItem('flagBicie');
		flagCocheras = sessionStorage.getItem('flagCocheras');
		flagPozos = sessionStorage.getItem('flagPozos');
		flagRejillas = sessionStorage.getItem('flagRejillas');
		getArea = sessionStorage.getItem('area');
		getInfrastructure = sessionStorage.getItem('currentInfrastructure');
		getModal = sessionStorage.getItem('modal');
		getQuote = sessionStorage.getItem('setQuote');
		getState = sessionStorage.getItem('state');
		valorBicie = sessionStorage.getItem('Bicie');
		$scope.k_u = false;
		loadSelectedProject;
		flags.push("flagPozos","flagRejillas","flagCocheras");

		init();

		function init(){
			$log.info('Iniciando...');
			
			if(getQuote  !== null){
				$scope.calculator = JSON.parse(getQuote);
				if (flagPozos == 'true') {
					$scope.flagPozos = true;
					$scope.form.PozosProyecto1 = $scope.calculator.PozosProyecto;
					$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
					$scope.submitted = true;
					$scope.pozos = "d";
				}
				if (flagPozos == 'false') {
					$scope.flagPozos = false;
					$scope.form.PozosProyecto2 = $scope.calculator.PozosProyecto;
					$scope.calculator.PozosProyecto = $scope.form.PozosProyecto2;
					$scope.submitted = true;
					$scope.pozos= "c";
					$scope.firstPozo = function(firstValue){
						//setCustPozo(firstValue);
						$scope.form.PozosProyecto2 = firstValue;
						$scope.calculator.PozosProyecto = firstValue;
						$scope.tmVar = $scope.form.PozosProyecto1;
						$scope.form.PozosProyecto1 = null;
					}
				}
			}

			if (getModal) {
				$scope.area = JSON.parse(getModal);
			}
			else{
				Modal();
			}
		}

		loadSelectedProject = (function(){
			var executed = false;
			if(getInfrastructure){
				$timeout(function(){
					if (!executed) {
						executed = true;
						imgProject = angular.element(document.getElementById(getInfrastructure));
						imgProject.addClass('radio_active');
					}
				}, 1000);
			}
			else{
				executed = false;
			}
		})();

		$scope.Modal = function(){
			return Modal();
		}

		function Modal(){
			$log.warn("Lanzando Modal");
			return $timeout(function(){
				$modal.open({
					controller: 'ModalController',
					controllerAs: "modalCtrl",
					templateUrl: './components/calculator/type/modal.html',
					resolve: {
						area: function () {
							return $scope.area;
						}
					}
				});
			}, 1500);
		}

		if (!$scope.calc) {
			$scope.calc = {
				"bicie": 0
			};
		}
		if (valorBicie) {
			$scope.calc.bicie = Number(valorBicie.toString());
		}



		/* Type of project options */
		$scope.getType = function(type){
			previousProject = imgProject;
			currentInfrastructure = angular.element(document.getElementById(typeProject));

			if(previousProject){
				!currentInfrastructure ? currentInfrastructure.removeClass('radio_active') : previousProject.removeClass('radio_active');
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
			sessionStorage.setItem('currentInfrastructure',imgProject[0].id);
		}
		
		
			if(getQuote  !== null){
				$scope.calculator = JSON.parse(getQuote);

				$log.info("sessionStorage not empty");
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
		
		$scope.getKlValue = function(valor){
			if (flagPozos == 'true' && $scope.pozos === 'd') {
				if (valor || $scope.tmVar === undefined) {
					setAutoPozo();
				}
				else{
					$scope.submitted = false;
					pozosValue = 0;
					$scope.form.PozosProyecto1 = pozosValue;
					$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
					sessionStorage.setItem('flagPozos', true);
					$scope.flagPozos = true;
				}
			}
			if (flagPozos == 'false' && $scope.pozos === 'd') {
				setAutoPozo();
			}
			if (flagPozos == null && $scope.pozos === 'd') {
				setAutoPozo();
			}
		}
		
		/* Start Pozos field */
		$scope.getPozos = function(valor){
			if (valor === "d") {
				$scope.pozos = valor;
				$scope.calculator.PozosProyecto = "";
				if ($scope.tmVar) {
					setAutoPozo();
				}
				else{
					setAutoPozo();
				}
				pozosValue = parseInt(($scope.calculator.KmEvaluables * 1000) / 200);
				$scope.form.PozosProyecto1 = pozosValue;
				$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
			}
			if (valor === "c") {
				$scope.pozos = valor;
				$scope.calculator.PozosProyecto = "";
				if ($scope.tmVar) {
					//setCustPozo($scope.tmVar);
					$scope.form.PozosProyecto2 = $scope.tmVar;
					$scope.calculator.PozosProyecto = $scope.form.PozosProyecto2;
					$scope.tmVar = $scope.form.PozosProyecto1;
					$scope.form.PozosProyecto1 = null;
					sessionStorage.setItem('flagPozos',false);
					$scope.flagPozos = false;
				}
				else{
					$scope.tmVar = $scope.form.PozosProyecto1;
					$scope.form.PozosProyecto1 = null;
				}
				$scope.firstPozo = function(firstValue){
					//setCustPozo(firstValue);
					$scope.form.PozosProyecto2 = firstValue;
					$scope.calculator.PozosProyecto = firstValue;
					$scope.tmVar = $scope.form.PozosProyecto1;
					$scope.form.PozosProyecto1 = null;
					sessionStorage.setItem('flagPozos',false);
					$scope.flagPozos = false;
				}
			}
		}
		
		function setAutoPozo(newValue){
			/*console.log(newValue)
			if (newValue) {
				pozosValue = parseInt((newValue * 1000) / 200);
				$scope.form.PozosProyecto1 = pozosValue;
				$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
				$scope.tmVar = $scope.form.PozosProyecto2;
				$scope.form.PozosProyecto2 = null;
			}*/
			pozosValue = parseInt(($scope.calculator.KmEvaluables * 1000) / 200);
			$scope.form.PozosProyecto1 = pozosValue;
			$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
			$scope.tmVar = $scope.form.PozosProyecto2;
			$scope.form.PozosProyecto2 = null;
			sessionStorage.setItem('flagPozos', true);
			$scope.flagPozos = true;
		}

		function setCustPozo(newValue){
			$scope.form.PozosProyecto2 = newValue;
			$scope.calculator.PozosProyecto = $scope.form.PozosProyecto2;
			$scope.tmVar = $scope.form.PozosProyecto1;
			$scope.form.PozosProyecto1 = null;
			sessionStorage.setItem('flagPozos',false);
			$scope.flagPozos = false;
		}
		
		/* Start Rejillas field */

		/* End Pozos field */
		$scope.getRejillas = function(valor){
			if (valor === "d") {
				rejillasValue = parseInt($scope.calculator.KmEvaluables * 25);
				parseRejillasValue = parseInt($filter('number')(rejillasValue, 0));
				$scope.form.RejillasProyecto1 = parseRejillasValue;
				$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto1;
				$scope.tmVar = $scope.form.RejillasProyecto2;
				$scope.form.RejillasProyecto2 = null;
				sessionStorage.setItem('flagRejillas','true');
				$scope.flagRejillas = true;
			}
			if (valor === "c") {
				if ($scope.tmVar) {
					$scope.form.RejillasProyecto2 = $scope.tmVar;
				}
				else{
					$scope.form.RejillasProyecto1 = null;
					$scope.firstRejilla = function(first){
						$scope.calculator.RejillasProyecto = first;
					}
				}
				$scope.tmVar = $scope.form.RejillasProyecto1;
				$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto2;
				$scope.form.RejillasProyecto1 = null;
				sessionStorage.setItem('flagRejillas','false');
				$scope.flagRejillas = false;
			}
		}
		/* End Rejillas field */


		/* Start Cocheras field */
		/* End Pozos field */
		$scope.getCocheras = function(valor){
			if (valor === "d") {
				cocherasValue = parseInt($scope.calculator.KmEvaluables * 25);
				parseCocherasValue = parseInt($filter('number')(cocherasValue, 0));
				$scope.form.CocherasProyecto1 = parseCocherasValue;
				$scope.calculator.Cocheras = $scope.form.CocherasProyecto1;
				$scope.tmVar = $scope.form.CocherasProyecto2;
				$scope.form.CocherasProyecto2 = null;
				sessionStorage.setItem('flagCocheras','true');
				$scope.flagCocheras = true;
			}
			if (valor === "c") {
				if ($scope.tmVar) {
					$scope.form.CocherasProyecto2 = $scope.tmVar;
				}
				else{
					$scope.form.CocherasProyecto1 = null;
					$scope.firstCochera = function(first){
						$scope.calculator.Cocheras = first;
					}
				}
				$scope.tmVar = $scope.form.CocherasProyecto1;
				$scope.calculator.CocherasProyecto = $scope.form.CocherasProyecto2;
				$scope.form.CocherasProyecto1 = null;
				sessionStorage.setItem('flagCocheras','false');
				$scope.flagCocheras = false;
			}
		}
		/* End Cocheras field */

		/* Start Biciestacionamientos field */
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
			var getModal = sessionStorage.getItem('modal');
			if (calculatorForm.$valid === true) {
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('setQuote',valores);
				if (!getModal) {
					$log.warn("Lanzando Modal");
					Modal();
				}
				else{
					$log.info("Sin modal");
					sendForm();
				}
			}
			else{
				$log.info("Formulario no válido");
			}
		};
		
		function sendForm(){
			var joinArea = JSON.parse(sessionStorage.getItem('area'));
			var joinData = JSON.parse(sessionStorage.getItem('setQuote'));

			function merge_cve(obj1,obj2){
				merg_final = {};
				for (var attrname in obj1) { merg_final[attrname] = obj1[attrname]; }
				for (var attrname in obj2) { merg_final[attrname] = obj2[attrname]; }
				return merg_final;
			}
			finalMerge = merge_cve(joinArea, joinData);

			return enviarFormulario(finalMerge);
		};
		
		var enviarFormulario = function(calculator){
			console.log(calculator);
			$log.info('Enviando formulario');
			SendQuote.sendQuote(calculator).
			then(function(result){
				if(result){
					$document.scrollTop(0);
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