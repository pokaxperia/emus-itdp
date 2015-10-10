(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.about',
		'emus.modalities',
		'emus.modalities.type',
		'emus.modality.factory',
		'emus.form',
		'emus.summary',
		'emus.modal.controller',
		'emus.form.factory',
		'emus.form.factory.mun',
		'emus.form.directives',
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

		$rootScope.$on('$stateChangeStart', function(event, toState){ 
			$rootScope.title = toState.data.title;
			return $rootScope.title;
		});

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