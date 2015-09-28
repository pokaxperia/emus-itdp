(function(){
	/**
	*  Modal Module
	*/
	'use strict';

	var ModalController = function(area, $modalInstance, $modal, $modalStack, $scope, $state, $log, SendQuote, Mun){

		var estArea,
		finalMerge,
		getArea,
		getModal,
		getQuote,
		merg_final,
		munArea,
		stringArea,
		valueArea;
		$scope.area = area;
		init();

		function init(){
			getArea = sessionStorage.getItem('area');
			getQuote = sessionStorage.getItem('setQuote');
			estArea = JSON.parse(sessionStorage.getItem('cveest'));
			munArea = JSON.parse(sessionStorage.getItem('cvemun'));

			if(getArea){
				valueArea = JSON.parse(getArea);
				$scope.k_u = true;
				setMun(valueArea.cveest);
			}
		}

		$scope.estados = [
			{"est":"Aguascalientes","cveestado":1},
			{"est":"Baja California","cveestado":2},
			{"est":"Baja California Sur","cveestado":3},
			{"est":"Campeche","cveestado":4},
			{"est":"Chiapas","cveestado":7},
			{"est":"Chihuahua","cveestado":8},
			{"est":"Coahuila","cveestado":5},
			{"est":"Colima","cveestado":6},
			{"est":"Distrito Federal","cveestado":9},
			{"est":"Durango","cveestado":10},
			{"est":"Guanajuato","cveestado":11},
			{"est":"Guerrero","cveestado":12},
			{"est":"Hidalgo","cveestado":13},
			{"est":"Jalisco","cveestado":14},
			{"est":"México","cveestado":15},
			{"est":"Michoacán de Ocampo","cveestado":16},
			{"est":"Morelos","cveestado":17},
			{"est":"Nayarit","cveestado":18},
			{"est":"Nuevo León","cveestado":19},
			{"est":"Oaxaca","cveestado":20},
			{"est":"Puebla","cveestado":21},
			{"est":"Querétaro","cveestado":22},
			{"est":"Quintana Roo","cveestado":23},
			{"est":"San Luis Potosí","cveestado":24},
			{"est":"Sinaloa","cveestado":25},
			{"est":"Sonora","cveestado":26},
			{"est":"Tabasco","cveestado":27},
			{"est":"Tamaulipas","cveestado":28},
			{"est":"Tlaxcala","cveestado":29},
			{"est":"Veracruz","cveestado":30},
			{"est":"Yucatán","cveestado":31},
			{"est":"Zacatecas","cveestado":32}
		];

		$scope.stateChanged = function(stateValue){
			var getCveEst = $scope.estados.some(function(states){
				if (states.est === stateValue){
					setMun(states.cveestado);
					estArea = {
						"cveest": states.cveestado
					};
					sessionStorage.setItem('cveest', JSON.stringify(estArea));
				}
			});
		}

		$scope.munChanged = function(munValue){
			var getCveMun = $scope.municipios.some(function(mun){
				if (mun.mun === munValue){
					munArea = {
						"cvemun": mun.cvemun
					};
					sessionStorage.setItem('cvemun', JSON.stringify(munArea));
				}
			})
		}

		$scope.saveArea = function () {
			
			function setValuesArea(objeto) {
				var stringArea = {
					"estado": objeto.estado,
					"municipio": objeto.municipio
				};

				stringArea = JSON.stringify(stringArea);
				sessionStorage.setItem('modal', stringArea);
			}
			setValuesArea($scope.area);
			
			function merge_cve(obj1,obj2){
				merg_final = {};
				for (var attrname in obj1) { merg_final[attrname] = obj1[attrname]; }
				for (var attrname in obj2) { merg_final[attrname] = obj2[attrname]; }
				return merg_final;
			}
			
			finalMerge = merge_cve(estArea, munArea);
			valueArea = JSON.stringify(finalMerge);
			sessionStorage.setItem('area', valueArea);

			sessionStorage.setItem('state', 'true');

			$modalInstance.close();
			
			if (getQuote !== null) {
				sendForm();
				$modalInstance.close();
				sessionStorage.setItem('state', 'true');
			}

		};

		$scope.updateArea = function () {

			function setValuesArea(objeto) {
				var stringArea = {
					"estado": objeto.estado,
					"municipio": objeto.municipio
				};

				stringArea = JSON.stringify(stringArea);
				sessionStorage.setItem('modal', stringArea);
			}
			setValuesArea($scope.area);
			
			function merge_cve(obj1,obj2){
				merg_final = {};
				for (var attrname in obj1) { merg_final[attrname] = obj1[attrname]; }
				for (var attrname in obj2) { merg_final[attrname] = obj2[attrname]; }
				return merg_final;
			}
			
			finalMerge = merge_cve(estArea, munArea);
			valueArea = JSON.stringify(finalMerge);
			sessionStorage.setItem('area', valueArea);

			sessionStorage.setItem('state', 'true');

			$modalInstance.close();
		};

		$scope.notYet = function () {
			sessionStorage.setItem('state', 'false');

			$modalInstance.close('notYet');
		};

		function setMun(valor){
			Mun.getMun(valor).then(
				function(result){
					$scope.municipios = result;
				},
				function(error){
					$log.error("Error: " + error);
				}
			);
		}

		function sendForm(){
			var joinArea = JSON.parse(sessionStorage.getItem('area'));
			var joinData = JSON.parse(sessionStorage.getItem('setQuote'));

			function merge_cve(obj1,obj2){
				merg_final = {};
				for (var attrname in obj1) { merg_final[attrname] = obj1[attrname]; }
				for (var attrname in obj2) { merg_final[attrname] = obj2[attrname]; }
				return merg_final;
			}
			finalMerge = merge_cve(joinArea, joinData);

			return enviarFormulario(finalMerge);
		};

		function enviarFormulario(calculator){
			console.log(calculator)
			$log.info('Enviando formulario');
			SendQuote.sendQuote(calculator).
			then(function(result){
				if(result){
					$document.scrollTop(0,1000);
					$scope.own = result.options;
					$scope.result = result;
					$state.go('modalidades.calculadora.resumen');
					$log.info("Ok");
				}
			}, function(error){
				$log.error("Error: " + error);
			});
		};

	};

	ModalController.$inject = ['area','$modalInstance','$modal', '$modalStack','$scope', '$state', '$log','SendQuote', 'Mun'];

	angular.module('emus.modal.controller', [])
		.controller('ModalController', ModalController);

}());