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
				data: {
					title: ""
				},
				ncyBreadcrumb: {
					label: 'Inicio'
				}
			})
			.state('modalidades', {
				url: '/modalidades',
				controller: 'ModalitiesController',
				data: {
					title: "Modalidades de la Estrategia de Movilidad Urbana Sustentable (EMUS)"
				},
				templateUrl: './components/modalities/modalities.html',
				ncyBreadcrumb: {
					label: 'Modalidades',
					parent: 'inicio'
				}
			})
			.state('modalidades.tipo', {
				url: '/:tipo',
				controller: 'ModalityTypeController',
				templateUrl: './components/modalities/type/template.html',
				ncyBreadcrumb: {
					label: 'Modalidades',
					parent: 'inicio'
				}
			})
			.state('modalidades.calculadora', {
				abstract: true,
				url: '/calculadora',
				templateUrl: './components/calculator/calculator.html'
			})
			.state('modalidades.calculadora.formulario', {
				url: '/formulario',
				templateUrl: './components/calculator/form/form.html',
				controller: 'FormController',
				data: {
					title: "Calculadora"
				},
				ncyBreadcrumb: {
					label: 'Calculadora',
					parent: 'modalidades.calculadora'
				}
			})
			.state('modalidades.calculadora.resumen', {
				url: '/resumen',
				templateUrl: './components/calculator/summary/summary.html',
				controller: 'SummaryController',
				data: {
					title: "Resumen"
				},
				ncyBreadcrumb: {
					label: 'Resumen',
					parent: 'modalidades.calculadora.formulario'
				}
			})
			.state('acerca', {
				url: '/acerca',
				templateUrl: './components/about/about.html',
				controller: 'AboutController',
				data: {
					title: "Acerca de EMUS"
				},
				ncyBreadcrumb: {
					label: 'Acerca de EMUS',
					parent: 'inicio'
				}
			});
	}]);

}());