(function(){
	'use strict';
	
	angular.module('emus.routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('inicio', {
				url: '/',
				templateUrl: './components/landing/landing.html',
				controller: 'LandingController'
			})
			.state('modalidades', {
				abstract: false,
				url: '/modalidades',
				templateUrl: './components/modalities/modalities.html',
				controller: 'ModalitiesController',
				ncyBreadcrumb: {
					label: 'MODALIDADES',
					parent: 'inicio'
				}
			})
			.state('modalidades.tipo', {
				url: '/:tipo',
				templateUrl: function($stateParams){
					return './components/modalities/type/'+$stateParams.tipo+'.html';
				},
				ncyBreadcrumb: {
					label: "{{ $stateParams.tipo }}",
					parent: 'modalidades'
				}
			})
			.state('modalidades.calculadora', {
				url: '/calculadora',
				templateUrl: './components/calculator/calculator.html',
				onEnter: function($rootScope) {
				  return $rootScope.pruebas;
				},
				controller: 'CalculatorController'
			})
			.state('modalidades.calculadora.tipo-de-proyecto', {
				url: '/tipo-de-proyecto',
				templateUrl: './components/calculator/type/type-of-project.html',
				ncyBreadcrumb: {
					label: "PROYECTO",
					parent: 'modalidades.calculadora'
				}
			})
			.state('modalidades.calculadora.formulario', {
				url: '/formulario',
				templateUrl: './components/calculator/form.html',
				ncyBreadcrumb: {
					label: "FORMULARIO",
					parent: 'modalidades.calculadora.tipo-de-proyecto'
				}
			})
			.state('modalidades.calculadora.resumen', {
				url: '/resumen',
				templateUrl: './components/calculator/summary.html'
			});
	}]);

}());