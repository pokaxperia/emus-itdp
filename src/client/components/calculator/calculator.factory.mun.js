(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.calculator.factory.mun', []).
	factory('Mun', ['$http', '$q', function($http, $q){
		return {
			getMun: function(valor){
				console.log(valor)
				varño = valor.toString();
				console.log(valor)
				var deferred = $q.defer();
				var response = $http.get('./claves/'+valor+'.json');
				response.then(function(result){
					deferred.resolve(result.data.results);
				}, function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}
		};
	}]);
})();
