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
				console.log(quote_values);
				var deferred = $q.defer();
				$http.post('api/index.php/estimate', quote_values).
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