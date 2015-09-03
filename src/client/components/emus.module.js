(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.modalities',
		'emus.modalities.type',
		'emus.calculator',
		'emus.calculator.factory',
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
			return $rootScope.state = toState.targetScope.$state.current;
		});
		
		return $rootScope;

	}])
	.config(function($modalProvider) {
  	$modalProvider.options.animation = true;
	});

}());