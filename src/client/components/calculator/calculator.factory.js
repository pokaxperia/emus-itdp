(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.calculator.factory', []).
	factory('SendQuote', ['$http', '$q', function($http, $q){
		return {
			sendQuote: function(quote_values){
				var deferred = $q.defer();
				return $http.post('http://itdp.mx/emus/#/', quote_values).
				then(function(result){
					deferred.resolve(result);
				}, function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}
		};
	}]);
})();