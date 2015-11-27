(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var FormController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, SendQuote, $stateParams, $rootScope, Mun){
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
		$scope.calculator = {};
		$scope.form = {};
		$scope.calc = {};
		$scope.area = {estado: "",municipio: ""};
		$scope.form.PozosProyecto1 = "";
		$scope.form.PozosProyecto2 = "";
		$scope.form.RejillasProyecto1 = "";
		$scope.form.RejillasProyecto2 = "";
		$scope.form.CocherasProyecto1 = "";
		$scope.form.CocherasProyecto2 = "";
		$scope.biciestacionamiento = "";
		$scope.calc.bicie = "";
		$scope.submitted = "";
		$scope.k_u = false;
		$scope.resultado = null;
		
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
		flags.push("flagPozos","flagRejillas","flagCocheras");

		init();

		function init(){
			loadSelectedProject();
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
						setCustPozo(firstValue);
					};
				}

				if (flagRejillas == 'true') {
					$scope.flagRejillas = true;
					$scope.form.RejillasProyecto1 = $scope.calculator.RejillasProyecto;
					$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto1;
					$scope.submitted = true;
					$scope.rejillas = "d";
				}
				if (flagRejillas == 'false') {
					$scope.flagRejillas = false;
					$scope.form.RejillasProyecto2 = $scope.calculator.RejillasProyecto;
					$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto2;
					$scope.submitted = true;
					$scope.rejillas= "c";
					$scope.firstRejilla = function(secondValue){
						setCustRejilla(secondValue);
					};
				}
				
				if (flagCocheras == 'true') {
					$scope.flagCocheras = true;
					$scope.form.CocherasProyecto1 = $scope.calculator.Cocheras;
					$scope.calculator.Cocheras = $scope.form.CocherasProyecto1;
					$scope.submitted = true;
					$scope.cocheras = "d";
				}
				if (flagCocheras == 'false') {
					$scope.flagCocheras = false;
					$scope.form.CocherasProyecto2 = $scope.calculator.Cocheras;
					$scope.calculator.Cocheras = $scope.form.CocherasProyecto2;
					$scope.submitted = true;
					$scope.cocheras= "c";
					$scope.firstCochera = function(thirdValue){
						setCustCochera(thirdValue);
					};
				}
				
				if (flagBicie == 'true') {
					$scope.flagBicie = true;
					$scope.submitted = true;
					$scope.biciestacionamiento = "default";
				}
				if (flagBicie == 'false') {
					$scope.flagBicie = false;
					$scope.calc.bicie = $scope.calculator.Biciestacionamientos;
					$scope.calculator.Biciestacionamientos = $scope.calc.bicie;
					$scope.submitted = true;
					$scope.biciestacionamiento = "c";
					$scope.firstBiciE = function(fourthValue){
						setCustBiciE(fourthValue);
					};
				}
			}

			if (getModal && getState === 'true') {
				$scope.area = JSON.parse(getModal);
			}
			else if(getState !== 'false'){
				Modal();
			}
		}

		 function loadSelectedProject(){
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
		}

		$scope.Modal = function(){
			return Modal();
		};

		function Modal(){
			$log.warn("Lanzando Modal");
			return $timeout(function(){
				$modal.open({
					controller: 'ModalController',
					controllerAs: "modalCtrl",
					templateUrl: './components/calculator/modal/modal.html',
					resolve: {
						area: function () {
							return $scope.area;
						}
					}
				});
			}, 1500);
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
		}
		
		$scope.getKlValue = function(valor){
			if (flagPozos == 'true' && $scope.pozos === 'd') {
				if (valor || $scope.tmPozos === undefined) {
					setAutoPozo();
				}
				else if(!valor){
					$scope.emptyWKl = true;
					$scope.submitted = false;
					$scope.form.PozosProyecto1 = "";
				}
				else{
					$scope.submitted = true;
					pozosValue = "";
					$scope.form.PozosProyecto1 = pozosValue;
					$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
					sessionStorage.setItem('flagPozos', true);
					$scope.flagPozos = true;
				}
			}
			if (flagPozos === 'false' && $scope.pozos === 'd') {
				setAutoPozo();
			}
			if (flagPozos === null && $scope.pozos === 'd') {
				setAutoPozo();
			}
			
			if (flagRejillas === 'true' && $scope.rejillas === 'd') {
				if (valor || $scope.tmRejillas === undefined) {
					setAutoRejilla();
				}
				else if(!valor){
					$scope.emptyRKl = true;
					$scope.submitted = false;
					$scope.form.RejillasProyecto1 = "";
				}
				else{
					$scope.submitted = true;
					rejillasValue = "";
					$scope.form.RejillasProyecto1 = rejillasValue;
					$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto1;
					sessionStorage.setItem('flagRejillas', true);
					$scope.flagRejillas = true;
				}
			}
			if (flagRejillas === 'false' && $scope.rejillas === 'd') {
				setAutoRejilla();
			}
			if (flagRejillas === null && $scope.rejillas === 'd') {
				setAutoRejilla();
			}
			
			if (flagCocheras === 'true' && $scope.cocheras === 'd') {
				if (valor || $scope.tmCocheras === undefined) {
					setAutoCochera();
				}
				else if(!valor){
					$scope.emptyCKl = true;
					$scope.submitted = false;
					$scope.form.CocherasProyecto1 = "";
				}
				else{
					$scope.submitted = true;
					cocherasValue = "";
					$scope.form.CocherasProyecto1 = cocherasValue;
					$scope.calculator.Cocheras = $scope.form.CocherasProyecto1;
					sessionStorage.setItem('flagCocheras', true);
					$scope.flagCocheras = true;
				}
			}
			if (flagCocheras === 'false' && $scope.cocheras === 'd') {
				setAutoCochera();
			}
			if (flagCocheras === null && $scope.cocheras === 'd') {
				setAutoCochera();
			}
		};
		
		
		/* Start Pozos field */
		$scope.getPozos = function(valor){
			if ($scope.calculator.KmEvaluables === undefined) {
				$scope.emptyWKl = true;
			}
			else{
				$scope.emptyWKl = false;
			}
			if (valor === "d") {
				$scope.pozos = valor;
				$scope.calculator.PozosProyecto = "";
				if ($scope.tmPozos) {
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
				if ($scope.tmPozos) {
					setCustPozo($scope.tmPozos);
					sessionStorage.setItem('flagPozos',false);
					$scope.flagPozos = false;
				}
				else{
					$scope.tmPozos = $scope.form.PozosProyecto1;
					$scope.form.PozosProyecto1 = null;
				}
				$scope.firstPozo = function(firstValue){
					setCustPozo(firstValue);
					sessionStorage.setItem('flagPozos',false);
					$scope.flagPozos = false;
				};
			}
		};
		
		function setAutoPozo(newValue){
			pozosValue = parseInt(($scope.calculator.KmEvaluables * 1000) / 200);
			$scope.form.PozosProyecto1 = pozosValue;
			$scope.calculator.PozosProyecto = $scope.form.PozosProyecto1;
			$scope.tmPozos = $scope.form.PozosProyecto2;
			$scope.form.PozosProyecto2 = null;
			sessionStorage.setItem('flagPozos', true);
			$scope.flagPozos = true;
		}

		function setCustPozo(newValue){
			$scope.form.PozosProyecto2 = newValue;
			$scope.calculator.PozosProyecto = $scope.form.PozosProyecto2;
			$scope.tmPozos = $scope.form.PozosProyecto1;
			$scope.form.PozosProyecto1 = null;
			sessionStorage.setItem('flagPozos',false);
			$scope.flagPozos = false;
		}
		/* End Pozos field */
		
		/* Start Rejillas field */
		$scope.getRejillas = function(valor){
			if ($scope.calculator.KmEvaluables === undefined) {
				$scope.emptyRKl = true;
			}
			else{
				$scope.emptyRKl = false;
			}
			if (valor === "d") {
				$scope.rejillas = valor;
				$scope.calculator.RejillasProyecto = "";
				if ($scope.tmRejillas) {
					setAutoRejilla();
				}
				else{
					setAutoRejilla();
				}
				rejillasValue = parseInt(($scope.calculator.KmEvaluables * 1000) / 200);
				$scope.form.RejillasProyecto1 = rejillasValue;
				$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto1;
			}
			if (valor === "c") {
				$scope.rejillas = valor;
				$scope.calculator.RejillasProyecto = "";
				if ($scope.tmRejillas) {
					setCustRejilla($scope.tmRejillas);
					sessionStorage.setItem('flagRejillas',false);
					$scope.flagRejillas = false;
				}
				else{
					$scope.tmRejillas = $scope.form.RejillasProyecto1;
					$scope.form.RejillasProyecto1 = null;
				}
				$scope.firstRejilla = function(secondValue){
					setCustRejilla(secondValue);
					sessionStorage.setItem('flagRejillas',false);
					$scope.flagRejillas = false;
				};
			}
		};
		
		function setAutoRejilla(newValue){
			rejillasValue = parseInt(($scope.calculator.KmEvaluables * 1000) / 200);
			$scope.form.RejillasProyecto1 = rejillasValue;
			$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto1;
			$scope.tmRejillas = $scope.form.RejillasProyecto2;
			$scope.form.RejillasProyecto2 = null;
			sessionStorage.setItem('flagRejillas', true);
			$scope.flagRejillas = true;
		}

		function setCustRejilla(newValue){
			$scope.form.RejillasProyecto2 = newValue;
			$scope.calculator.RejillasProyecto = $scope.form.RejillasProyecto2;
			$scope.tmRejillas = $scope.form.RejillasProyecto1;
			$scope.form.RejillasProyecto1 = null;
			sessionStorage.setItem('flagRejillas',false);
			$scope.flagRejillas = false;
		}
		/* End Rejillas field */

		/* Start Cocheras field */
		$scope.getCocheras = function(valor){
			if ($scope.calculator.KmEvaluables === undefined) {
				$scope.emptyCKl = true;
			}
			else{
				$scope.emptyCKl = false;
			}
			if (valor === "d") {
				$scope.cocheras = valor;
				$scope.calculator.Cocheras = "";
				if ($scope.tmCocheras) {
					setAutoCochera();
				}
				else{
					setAutoCochera();
				}
				cocherasValue = parseInt($scope.calculator.KmEvaluables * 25);
				$scope.form.CocherasProyecto1 = cocherasValue;
				$scope.calculator.Cocheras = $scope.form.CocherasProyecto1;
			}
			if (valor === "c") {
				$scope.cocheras = valor;
				$scope.calculator.Cocheras = "";
				if ($scope.tmCocheras) {
					setCustCochera($scope.tmCocheras);
					sessionStorage.setItem('flagCocheras',false);
					$scope.flagCocheras = false;
				}
				else{
					$scope.tmCocheras = $scope.form.CocherasProyecto1;
					$scope.form.CocherasProyecto1 = null;
				}
				$scope.firstCochera = function(thirdValue){
					setCustCochera(thirdValue);
					sessionStorage.setItem('flagCocheras',false);
					$scope.flagCocheras = false;
				};
			}
		};
		
		function setAutoCochera(newValue){
			cocherasValue = parseInt($scope.calculator.KmEvaluables * 25);
			$scope.form.CocherasProyecto1 = cocherasValue;
			$scope.calculator.Cocheras = $scope.form.CocherasProyecto1;
			$scope.tmCocheras = $scope.form.CocherasProyecto2;
			$scope.form.CocherasProyecto2 = null;
			sessionStorage.setItem('flagCocheras', true);
			$scope.flagCocheras = true;
		}

		function setCustCochera(newValue){
			$scope.form.CocherasProyecto2 = newValue;
			$scope.calculator.Cocheras = $scope.form.CocherasProyecto2;
			$scope.tmCocheras = $scope.form.CocherasProyecto1;
			$scope.form.CocherasProyecto1 = null;
			sessionStorage.setItem('flagCocheras',false);
			$scope.flagCocheras = false;
		}
		/* End Cocheras field */

		/* Start Biciestacionamientos field */
		$scope.getBiciE = function(valor){
			if (valor === "default") {
				$scope.biciestacionamiento = valor;
				if ($scope.tmBicie) {
					setAutoBicie();
				}
				else{
					setAutoBicie();
				}
				sessionStorage.setItem('flagBicie',true);
				$scope.flagBicie = true;
			}
			if (valor === "c") {
				$scope.biciestacionamiento = valor;
				/*if ($scope.tmBicie) {
					setCustBiciE($scope.tmBicie);
					sessionStorage.setItem('flagBicie',false);
					$scope.flagBicie = false;
				}
				else{
					$scope.tmBicie = $scope.biciestacionamiento;
					$scope.biciestacionamiento = null;
				}*/
				$scope.firstBiciE = function(fourthValue){
					setCustBiciE(fourthValue);
					sessionStorage.setItem('flagBicie',false);
					$scope.flagBicie = false;
				};
			}
		};
		function setAutoBicie(){
			$scope.calculator.Biciestacionamientos = "default";
			$scope.tmBicie = $scope.calc.bicie;
			$scope.calc.bicie = null;
			sessionStorage.setItem('flagBicie', true);
			$scope.flagBicie = true;
		}

		function setCustBiciE(newValue){
			$scope.calc.bicie = newValue;
			$scope.calculator.Biciestacionamientos = newValue;
			sessionStorage.setItem('flagBicie',false);
			$scope.flagBicie = false;
		}
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
				$scope.calculatorForm.submitted = true;
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
		}
		
		var enviarFormulario = function(calculator){
			$log.info('Enviando formulario');
			SendQuote.sendQuote(calculator).
			then(function(result){
				if(result){
					console.log(result);
					$document.scrollTop(0);
					sessionStorage.setItem('results', JSON.stringify(result));
					$state.go('modalidades.calculadora.resumen');
					$log.info("Ok");
				}
			}, function(error){
				$log.error("Error: " + error);
			});
		};
	};

	FormController.$inject = ['$document','$timeout',  '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter','SendQuote', '$stateParams', '$rootScope', 'Mun'];

	angular.module('emus.form', [])
		.controller('FormController', FormController);
}());