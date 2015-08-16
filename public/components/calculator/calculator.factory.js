/**
* Service Module
*
* Description
*/
angular.module('emus.calculator.factory', []).
factory('SendQuote', ['$http', '$q',function($http, $q){
	var deferred = $q.defer();
	return {
		sendQuote: function(quote_values){
			return $http.post('http://itdp.mx/emus/#/', quote_values).
			then(function(result){
				deferred.resolve(result);
			}, function(error){
				deferred.reject(error);
			});
		}
		
	};
	return deferred.promise;
}]);