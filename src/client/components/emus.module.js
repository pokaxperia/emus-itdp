(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.modalities',
		'emus.calculator',
		'emus.calculator.factory',
		'duScroll',
		'ncy-angular-breadcrumb',
		'ngAnimate',
		'ui.bootstrap',
		'nya.bootstrap.select'
		]
	)
	.value('duScrollDuration', 750)
	.run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			$rootScope.estado = toState.name;
		});

		return $rootScope;

	}])
	.config(function($modalProvider) {
  	$modalProvider.options.animation = true;
	});

}());