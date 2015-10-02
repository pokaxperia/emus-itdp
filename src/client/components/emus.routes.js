(function(){
	'use strict';
	
	angular.module('emus.routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('inicio', {
				url: '/',
				controller: 'LandingController',
				templateUrl: './components/landing/landing.html',
				ncyBreadcrumb: {
					label: 'Inicio'
				}
			})
			.state('modalidades', {
				url: '/modalidades',
				controller: 'ModalitiesController',
				templateUrl: './components/modalities/modalities.html',
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
				//controller: 'CalculatorController',
				templateUrl: './components/calculator/calculator.html'
			})
			.state('modalidades.calculadora.formulario', {
				url: '/formulario',
				templateUrl: './components/calculator/form/form.html',
				controller: 'FormController',
				ncyBreadcrumb: {
					label: 'Calculadora',
					parent: 'modalidades.calculadora'
				}
			})
			.state('modalidades.calculadora.resumen', {
				url: '/resumen',
				templateUrl: './components/calculator/summary/summary.html',
				controller: 'SummaryController',
				ncyBreadcrumb: {
					label: 'Resumen',
					parent: 'modalidades.calculadora.formulario'
				}
			});
	}]);

}());