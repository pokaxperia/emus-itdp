(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.about',
		'emus.matrix',
		'emus.matrix.step',
		'emus.matrix.grid.directive',
		'emus.matrix.step.directive',
		'emus.matrix.button.directive',
		'emus.matrix.navigation.directive',
		'emus.matrix.factory',
		'emus.modalities',
		'emus.modalities.type',
		'emus.modality.factory',
		'emus.modality.more.directive',
		'emus.modality.hide.directive',
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
		'angularUtils.directives.uiBreadcrumbs',
		'akoenig.deckgrid'
		]
	)
	.value('duScrollDuration', 750)
	.run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams, $location) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		$rootScope.$on('$stateChangeStart', function(event, toState){ 
			$rootScope.title = toState.data.title;
			//$rootScope.$broadcast('urlName', toState.url);
			return $rootScope.title;
		});

		$rootScope.$on('$stateChangeSuccess', function(toState){
			$rootScope.state = toState.targetScope.$state.current;
			$rootScope.$broadcast('urlName', toState.targetScope.$state.current.url);
			return $rootScope.state;
		});
		
		return $rootScope;

	}])
	.config(function($modalProvider) {
  	$modalProvider.options.animation = true;
	});

}());