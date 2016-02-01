(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function MatrixNavigation($log, $location, $compile, $state, $rootScope, MatrixFactory, $timeout){
		
		var getStorage = null,
		setStorage = null,
		phaseUrl = null,
		modalityUrl = null,
		phaseName = null,
		modalityName = null,
		currentCell = null,
		currentId = null,
		_body = null,
		_this = null,
		_activo = null,
		_js_matrix_navigation = null;

		return {
			restrict: 'E',
			templateUrl: 'components/matrix-navigation/navigation.html',
			controller: function($scope){

				$scope.$watch(function(){
					return sessionStorage.getItem('matrix');
				}, function(valor){
					if(valor !== null){

						getStorage = JSON.parse(valor);

						$scope.modalityUrl= getStorage.modalityUrl;
						$scope.phaseUrl= getStorage.phaseUrl;
						$scope.phaseName = getStorage.phaseName;
						$scope.modalityName = getStorage.modalityName;

					}
					else{
						_body.css("padding-bottom","0px");
						_js_matrix_navigation.css("display", "none");
					}
				});
				
				$scope.changePhase = function(modality, phase, phaseName, id){
					_this = angular.element(event.target);
					currentCell = JSON.parse(sessionStorage.getItem('id'));
					currentId = currentCell.modalityId;
					currentCell = {"phaseId": id, "modalityId": currentId};
					sessionStorage.setItem('id', JSON.stringify(currentCell));
					/*currentCell.push({
						phaseId: id
					})*/

					$location.url('matriz/'+ modality + '/' + phase);

					modalityUrl = modality;
					modalityName = $scope.modalityName;
					phaseUrl = phase;
					phaseName = phaseName;

					var phaseModality = {modalityUrl: modalityUrl, modalityName: modalityName, phaseUrl: phaseUrl, phaseName: phaseName}

					setStorage = JSON.stringify(phaseModality);
					sessionStorage.setItem('matrix', setStorage);
				};

				_js_matrix_navigation = angular.element(document.getElementsByClassName('js-matrix-navigation'));
				_body = angular.element(document.getElementsByTagName('body'));

				$rootScope.$on('urlName', function(event, args){
					if (getStorage === null) {
						_body.css("padding-bottom","0px");
						_js_matrix_navigation.css("display", "none");
					}
					else{
						_body.css("padding-bottom","61px");
						_js_matrix_navigation.css("display", "block");
					}

					$timeout(function(){
						$scope.$watch(function(){
							_activo = angular.element(document.getElementsByClassName('js-' + event.targetScope.phaseUrl));
							_activo.addClass('current_item');
						});
							
					}, 500);
				});
			}
		};

	}

	MatrixNavigation.$inject = ['$log', '$location', '$compile','$state', '$rootScope', 'MatrixFactory', '$timeout'];

	angular.module('emus.matrix.navigation.directive', [])
		.directive('matrixNavigation', MatrixNavigation);
}());