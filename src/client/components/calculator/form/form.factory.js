(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.form.factory', []).
	factory('SendQuote', ['$http', '$q', function($http, $q){
		return {
			sendQuote: function(quote_values){
				var data = JSON.stringify(quote_values);
				var deferred = $q.defer();

				var response = $http({
					method: 'POST',
					url: 'api/index.php/estimate',
					data: data,
					headers: {
						'Content-Type': 'application/json'
					}
				});

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
