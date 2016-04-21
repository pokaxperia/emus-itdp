(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.form.factory.mun', []).
	factory('Mun', ['$http', '$q', function($http, $q){
		return {
			getMun: function(valor){
				var deferred = $q.defer();
				var response = $http.get('./components/calculator/claves/'+valor+'.json');
				response.then(function(result){
					deferred.resolve(result.data);
				}, function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}
		};
	}]);
})();
