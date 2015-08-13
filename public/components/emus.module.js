(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.modalities',
		'emus.calculator',
		'duScroll'
		]
	)
	.value('duScrollDuration', 750)
	.run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			$rootScope.nombre = toState.name;
		});

		return $rootScope;

	}]);

}());