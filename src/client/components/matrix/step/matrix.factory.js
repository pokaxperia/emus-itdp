(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.matrix.factory', []).
	factory('MatrixFactory', ['$http', '$q', function($http, $q){
		return {
			getPhases: function(modality){
				var deferred = $q.defer();
				var response = $http.get('http://52.53.210.111/emus-itdp/api/index.php/fases');

				response.then(function(result){
					deferred.resolve();
				}, function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}
		};
	}]);
})();
