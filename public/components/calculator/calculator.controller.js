	/**
	*  Calculator Module
	*/
(function(){
	'use strict';

	var CalculatorController = function($scope,$location, $state, $log){
		var tipo;
		$scope.calculator = {};
		var getQuotesValues = sessionStorage.getItem('valor');
		
		if(Object.keys($scope.calculator).length === 0){
			$log.warn("Calculator object value: " +Object.keys($scope.calculator).length);
			if(getQuotesValues === null){
				$log.warn("sessionStorage empty");
				sessionStorage.clear();
				$log.info("Cleaning sessionStorage");
			}
			else{
				$log.info("sessionStorage not empty");
				var quotes = JSON.parse(getQuotesValues);
				$scope.calculator = quotes;
			}
		}

		$scope.getType = function(tipo){
			tipo = tipo.infraestructura;
			if(tipo){
				var valores = JSON.stringify($scope.calculator);
				sessionStorage.setItem('valor',valores);
				$state.go('modalidades.calculadora.formulario');
			}
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

		$scope.saveQuote = function(calculatorForm, calculator){
			console.log(calculatorForm);
			if (calculatorForm.$valid === true) {
				$scope.calculatorForm.submitted = true;
				var valores = JSON.stringify(calculator);
				sessionStorage.setItem('valor',valores);
				$state.go('modalidades.calculadora.formulario');
			}
		};

	};

	CalculatorController.$inject = ['$scope','$location', '$state', '$log'];

	angular.module('emus.calculator', []).
	controller('CalculatorController', CalculatorController);
}());