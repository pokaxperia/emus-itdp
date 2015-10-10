(function(){
	/**
	* Factory Module
	*
	* Description
	*/
	angular.module('emus.modality.factory', []).
	factory('ModalityFactory', ['$http', '$q', function($http, $q){
		return {
			getModality: function(modality){
				var deferred = $q.defer();

				var response = $http.get('./components/modalities/type_modalities/'+modality+'.json');

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
