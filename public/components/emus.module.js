(function(){

	'use strict';

	angular.module('emus',[
		'emus.routes',
		'emus.landing',
		'emus.calculator',
		'duScroll'
		]
	)
	.value('duScrollDuration', 750)
	.run(["$rootScope", "$state", "$stateParams",function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		return $rootScope;
	}]);

}());