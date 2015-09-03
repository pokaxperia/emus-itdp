(function(){
	'use strict';
	
	angular.module('emus.routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('inicio', {
				url: '/',
				templateUrl: './components/landing/landing.html',
				controller: 'LandingController',
				ncyBreadcrumb: {
					label: 'Inicio'
				}
			})
			.state('modalidades', {
				url: '/modalidades',
				templateUrl: './components/modalities/modalities.html',
				controller: 'ModalitiesController',
				ncyBreadcrumb: {
					label: 'Modalidades',
					parent: 'inicio'
				}
			})
			.state('modalidades.tipo', {
				url: '/:tipo',
				templateUrl: function($stateParams){
					return './components/modalities/type/'+$stateParams.tipo+'.html';
				},
				ncyBreadcrumb: {
					label: 'Modalidades',
					parent: 'inicio'
				}
			})
			.state('modalidades.calculadora', {
				abstract: true,
				url: '/calculadora',
				templateUrl: './components/calculator/calculator.html',
				controller: 'CalculatorController'
			})
			.state('modalidades.calculadora.tipo-de-proyecto', {
				url: '/tipo-de-proyecto',
				templateUrl: './components/calculator/type/type-of-project.html',
				ncyBreadcrumb: {
					label: 'Tipo de proyecto'
				}
			})
			.state('modalidades.calculadora.formulario', {
				url: '/formulario',
				templateUrl: './components/calculator/form.html',
				ncyBreadcrumb: {
					label: 'Calculadora',
					parent: 'modalidades.calculadora.tipo-de-proyecto'
				}
			})
			.state('modalidades.calculadora.resumen', {
				url: '/resumen',
				templateUrl: './components/calculator/summary.html',
				ncyBreadcrumb: {
					label: 'Resumen',
					parent: 'modalidades.calculadora.formulario'
				}
			});
	}]);

}());