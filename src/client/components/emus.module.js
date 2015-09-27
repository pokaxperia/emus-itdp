(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.modalities',
		'emus.modalities.type',
		'emus.calculator',
		'emus.modal.controller',
		'emus.calculator.factory',
		'emus.calculator.factory.mun',
		'emus.calculator.directives',
		'duScroll',
		'ncy-angular-breadcrumb',
		'ngAnimate',
		'ui.bootstrap',
		'nya.bootstrap.select',
		'angularUtils.directives.uiBreadcrumbs'
		]
	)
	.value('duScrollDuration', 750)
	.run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
		$rootScope.$on('$stateChangeSuccess', function(toState){
			$rootScope.state = toState.targetScope.$state.current;
			return $rootScope.state;
		});
		
		return $rootScope;

	}])
	.config(function($modalProvider) {
  	$modalProvider.options.animation = true;
	});

}());