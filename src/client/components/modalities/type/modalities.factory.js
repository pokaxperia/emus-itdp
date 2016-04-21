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

				//var response = $http.get('./components/modalities/type_modalities/'+modality+'.json');
				var response = $http.get('http://54.200.40.169/emus-itdp/api/index.php/modalidades/' + modality);

				response.then(function(result){
					deferred.resolve(result.data.results[0]);
				}, function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			}
		};
	}]);
})();
