(function(){
	'use strict';
	
	angular.module('emus.routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('index', {
				url: '/',
				templateUrl: './components/landing/landing.html',
				controller: 'LandingController'
			})
			.state('modalidades', {
				url: '/modalidades',
				templateUrl: './components/modalities/modalities.html',
				controller: 'ModalitiesController'
			})
			.state('modalidades.calles', {
				url: '/calles',
				templateUrl: './components/modalities/streets/streets.html'
			})
			.state('modalidades.calculadora', {
				url: '/calculadora',
				templateUrl: './components/calculator/calculator.html',
				controller: 'CalculatorController'
			})
			.state('modalidades.calculadora.tipo-de-proyecto', {
				url: '/tipo-de-proyecto',
				templateUrl: './components/calculator/type-of-project.html'
			})
			.state('modalidades.calculadora.formulario', {
				url: '/formulario',
				templateUrl: './components/calculator/form.html'
			})
			.state('modalidades.calculadora.resumen', {
				url: '/resumen',
				templateUrl: './components/calculator/summary.html'
			});
	}]);

}());