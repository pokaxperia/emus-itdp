	/**
	*  Calculator Module
	*/
(function(){
	'use strict';

	var CalculatorController = function($scope,$location, $state, $log){

		var tipo;
		$scope.bandera = false;
		$scope.calculator = {};
		var getQuote = sessionStorage.getItem('setQuote');
		var flag = sessionStorage.getItem('flag');

		if(getQuote  !== null){
			$scope.calculator = JSON.parse(getQuote);
			$log.info("sessionStorage not empty");
			if (flag == 'true') {
				$scope.flag = true;
			}
			else{
				$scope.flag = false;
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

		$scope.getType = function(tipo){
			$log.info("sessionStorage not empty");
			tipo = tipo.infraestructura;
			if(tipo){
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
		
		if (flag == 'true') {
			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
					sessionStorage.setItem('flag','true');
					$scope.flag = true; 
					$scope.calculator.PozosProyecto = (newValue * 1000) / 200;
					$scope.valores = $scope.calculator.PozosProyecto;
			});
		}

		$scope.getPozosAuto = function(valor){
			sessionStorage.setItem('flag','true');
			$scope.flag = true;

			$scope.$watch('calculator.KmEvaluables', function(newValue, oldValue){
				sessionStorage.setItem('flag','true');
				$scope.flag = true;
				$scope.calculator.PozosProyecto = (newValue * 1000) / 200;
				$scope.valores = $scope.calculator.PozosProyecto;
			});
		};

		$scope.getPozosCustom = function(){
			sessionStorage.setItem('flag','false');
			$scope.flag = false;
			$scope.$watch( 'calculator.PozosProyecto', function(newValue, oldValue){
				$scope.nuevosvalores = newValue;
			});
		};
		//Form
		$scope.saveQuote = function(calculatorForm, calculator){
			if (calculatorForm.$valid === true) {
				$scope.calculatorForm.submitted = true;
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('setQuote',valores);
				$state.go('modalidades.calculadora.formulario');
			}
		};

	};

	CalculatorController.$inject = ['$scope','$location', '$state', '$log'];

	angular.module('emus.calculator', []).
	controller('CalculatorController', CalculatorController);
}());