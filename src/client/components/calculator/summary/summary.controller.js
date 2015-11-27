(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var SummaryController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, $stateParams, $rootScope){
		var area, sumTotal, subTotal, inputData, inputResult, setResults, itemResult, itemsValues, finalEE = {}, finalEM = {}, finalIE = {}, finalIM = {}, itemsEgrEst, itemsEgrMun, itemsIngEst, itemsIngMun, itemsEE, itemsEM, itemsIE, itemsIM, sortEE, sortEM, sortIE, sortIM;
		itemsEE = {
			ee1:"Egresos",
			ee2:"Egresos por cada 1000 habitantes",
			ee3:"Servicios personales",
			ee4:"% de Servicios personales",
			ee5:"Servicios personales por cada 1000 habitantes",
			ee6:"Materiales y suministros",
			ee7:"% de Materiales y suministros",
			ee8:"Material y suministros por cada 1000 habitantes",
			ee9:"Servicios generales",
			ee10:"% de Servicios generales",
			ee11:"Servicios generales por cada 1000 habitantes",
			ee12:"Transferencias, asignaciones, subsidios y otras ayudas",
			ee13:"% de Transferencias, asignaciones, subsidios y otras ayudas",
			ee14:"Transferencias, asignaciones, subsidios y otras ayudas por cada 1000 habitantes",
			ee15:"Bienes muebles, inmuebles e intangibles",
			ee16:"% de Bienes muebles, inmuebles e intangibles",
			ee17:"Bienes muebles, inmuebles e intangibles por cada 1000 habitantes",
			ee18:"Inversión pública",
			ee19:"% de Inversión pública",
			ee20:"Inversión pública por cada 1000 habitantes",
			ee21:"Inversiones financieras y otras provisiones",
			ee22:"% de Inversiones financieras y otras provisiones",
			ee23:"Inversiones financieras y otras provisiones por cada 1000 habitantes",
			ee24:"Recursos asignados a municipios",
			ee25:"% de Recursos asignados a municipios",
			ee26:"Recursos asignados a municipios por cada 1000 habitantes",
			ee27:"Otros egresos",
			ee28:"% de Otros egresos",
			ee29:"Otros egresos por cada 1000 habitantes",
			ee30:"Deuda pública",
			ee31:"% de Deuda pública",
			ee32:"Deuda pública por cada 1000 habitantes",
			ee33:"Disponibilidad final",
			ee34:"% de Disponibilidad final",
			ee35:"Disponibilidad final por cada 1000 habitantes"
		}; 
		itemsEM = {
			em1: "Egresos",
			em2: "egresos por cada 1000 habitantes",
			em3: "Servicios personales",
			em4: "Porcentaje de Servicios personales",
			em5: "Servicios personales por cada 1000 habitantes",
			em6: "Materiales y suministros",
			em7: "Porcentaje de Materiales y suministros",
			em8: "Materiales y suministros por cada 1000 habitantes",
			em9: "Servicios generales",
			em10: "Porcentaje de Servicios generales",
			em11: "Servicios generales por cada 1000 habitantes",
			em12: "Transferencias, asignaciones, subsidios y otras ayudas",
			em13: "Porcentaje de Transferencias, asignaciones, subsidios y otras ayudas",
			em14: "Transferencias, asignaciones, subsidios y otras ayudas por cada 1000 habitantes",
			em15: "Bienes muebles, inmuebles e intangibles",
			em16: "Porcentaje de Bienes muebles, inmuebles e intangibles",
			em17: "Bienes muebles, inmuebles e intangibles por cada 1000 habitantes",
			em18: "Inversión pública",
			em19: "Porcentaje de Inversión pública",
			em20: "Inversión pública por cada 1000 habitantes",
			em21: "Inversiones financieras y otras provisiones",
			em22: "Porcentaje de Inversiones financieras y otras provisiones",
			em23: "Inversiones financieras y otras provisiones por cada 1000 habitantes",
			em24: "Otros egresos",
			em25: "Porcentaje de Otros egresos",
			em26: "Otros egresos por cada 1000 habitantes",
			em27: "Deuda pública",
			em28: "Porcentaje de Deuda pública",
			em29: "Deuda pública por cada 1000 habitantes",
			em30: "Disponibilidad final",
			em31: "Porcentaje de Disponibilidad final",
			em32: "Disponibilidad final por cada 1000 habitantes"
		};
		itemsIE = {
			ie1: "Población municipal",
			ie2: "Ingresos totales",
			ie3: "Ingresos por cada mil habitantes",
			ie4: "Impuestos totales",
			ie5: "Porcentaje de Impuestos totales",
			ie6: "Impuestos por cada 1000 habitantes",
			ie7: "Cuotas y Aportaciones de Seguridad Social",
			ie8: "Porcentaje de Cuotas y Aportaciones de Seguridad Social",
			ie9: "Cuotas y Aportaciones de Seguridad Social por cada 1000 habitantes",
			ie10: "Contribuciones de Mejoras",
			ie11: "Porcentaje de Contribuciones de Mejoras",
			ie12: "Contribuciones de Mejoras por cada 1000 habitantes",
			ie13: "Derechos",
			ie14: "Porcentaje de Derechos",
			ie15: "Derechos por cada 1000 habitantes",
			ie16: "Productos",
			ie17: "Porcentaje de Productos",
			ie18: "Productos por cada 1000 habitantes",
			ie19: "Aprovechamientos",
			ie20: "Porcentaje de Aprovechamientos",
			ie21: "Aprovechamientos por cada 1000 habitantes",
			ie22: "Participaciones federales",
			ie23: "Porcentaje de Participaciones federales",
			ie24: "Participaciones federales por cada 1000 habitantes",
			ie25: "Aportaciones federales y estatales",
			ie26: "Porcentaje de Aportaciones federales y estatales",
			ie27: "Aportaciones federales y estatales por cada 1000 habitantes",
			ie28: "Otros ingresos",
			ie29: "Porcentaje de Otros ingresos",
			ie30: "Otros ingresos por cada 1000 habitantes",
			ie31: "Financiamiento",
			ie32: "Porcentaje de Financiamiento",
			ie33: "Financiamiento por cada 1000 habitantes",
			ie34: "Disponibilidad inicial",
			ie35: "Porcentaje de Disponibilidad inicial",
			ie36: "Disponibilidad inicial por cada 1000 habitantes"
		};
		itemsIM = {
			im1: "Población municipal",
			im2: "Ingresos totales",
			im3: "Ingresos por cada mil habitantes",
			im4: "Impuestos totales",
			im5: "Porcentaje de Impuestos totales",
			im6: "Impuestos por cada 1000 habitantes",
			im7: "Cuotas y Aportaciones de Seguridad Social",
			im8: "Porcentaje de Cuotas y Aportaciones de Seguridad Social",
			im9: "Cuotas y Aportaciones de Seguridad Social por cada 1000 habitantes",
			im10: "Contribuciones de Mejoras",
			im11: "Porcentaje de Contribuciones de Mejoras",
			im12: "Contribuciones de Mejoras por cada 1000 habitantes",
			im13: "Derechos",
			im14: "Porcentaje de Derechos",
			im15: "Derechos por cada 1000 habitantes",
			im16: "Productos",
			im17: "Porcentaje de Productos",
			im18: "Productos por cada 1000 habitantes",
			im19: "Aprovechamientos",
			im20: "Porcentaje de Aprovechamientos",
			im21: "Aprovechamientos por cada 1000 habitantes",
			im22: "Participaciones federales",
			im23: "Porcentaje de Participaciones federales",
			im24: "Participaciones federales por cada 1000 habitantes",
			im25: "Aportaciones federales y estatales",
			im26: "Porcentaje de Aportaciones federales y estatales",
			im27: "Aportaciones federales y estatales por cada 1000 habitantes",
			im28: "Otros ingresos",
			im29: "Porcentaje de Otros ingresos",
			im30: "Otros ingresos por cada 1000 habitantes",
			im31: "Financiamiento",
			im32: "Porcentaje de Financiamiento",
			im33: "Financiamiento por cada 1000 habitantes",
			im34: "Disponibilidad inicial",
			im35: "Porcentaje de Disponibilidad inicial",
			im36: "Disponibilidad inicial por cada 1000 habitantes"
		};
		
		init();
		
		function init(){

			setResults = sessionStorage.getItem('results');
			itemResult = JSON.parse(setResults);
			
			if(setResults){
				itemsEgrEst = itemResult.egresos.estatales;
				itemsEgrMun = itemResult.egresos.municipales;
				itemsIngEst = itemResult.ingresos.estatales;
				itemsIngMun = itemResult.ingresos.municipales;
				area = JSON.parse(sessionStorage.getItem('modal'));

				delete itemsEgrEst.cvegeo;
				delete itemsEgrEst.nomestado;

				delete itemsEgrMun.cveestado;
				delete itemsEgrMun.cvemun;
				delete itemsEgrMun.nomestado;
				delete itemsEgrMun.nommun;

				delete itemsIngEst.cvegeo;
				delete itemsIngEst.nomestado;

				delete itemsIngMun.cveestado;
				delete itemsIngMun.cvemun;
				delete itemsIngMun.nomestado;
				delete itemsIngMun.nommun;

				// Match Egresos estatales
				for(var itemEE in itemsEgrEst){
					finalEE[itemsEE[itemEE]] = itemsEgrEst[itemEE];
				}
				sortEE = Object.keys(finalEE).sort();
				$log.info(finalEE);
				// Match Egresos municipales
				for(var itemEM in itemsEgrMun){
					finalEM[itemsEM[itemEM]] = itemsEgrMun[itemEM];
				}
				sortEM = Object.keys(finalEM).sort();
				$log.info(finalEM);

				// Match Egresos estatales
				for(var itemIE in itemsIngEst){
					finalIE[itemsIE[itemIE]] = itemsIngEst[itemIE];
				}
				sortIE = Object.keys(finalIE).sort();
				$log.info(finalIE);
				// Match Egresos municipales
				for(var itemIM in itemsIngMun){
					finalIM[itemsIM[itemIM]] = itemsIngMun[itemIM];
				}
				sortIM = Object.keys(finalIM).sort();
				$log.info(finalIM);

				inputData = itemResult.options;
				$scope.inputResult = itemResult;
				sumTotal = itemResult;
				
			}

			$scope.first = {
				open: false
			};
		}
		

		// Charts
		
		var chartEgrEst = AmCharts.makeChart("EgrEst", {
			"type": "serial",
			"theme": "light",
			'rotate': true,
			"legend": {
					"autoMargins": false,
					"borderAlpha": 0.2,
					"equalWidths": false,
					"horizontalGap": 10,
					"markerSize": 10,
					"useGraphSettings": true,
					"valueAlign": "left",
					"valueWidth": 0
			},
			"dataProvider": [{
					"title": "",
					"year": "2003",
					"europe": 2.5,
					"namerica": 2.5,
					"asia": 2.1,
					"lamerica": 0.3,
					"meast": 0.2,
					"africa": 0.1
			}, {
					"title": "Municipio c/1000 h.",
					"year": "2004",
					"europe": 2.6,
					"namerica": 2.7,
					"asia": 2.2,
					"lamerica": 0.3,
					"meast": 0.3,
					"africa": 0.1
			}, {
					"title": "",
					"year": "2005",
					"europe": 2.8,
					"namerica": 2.9,
					"asia": 2.4,
					"lamerica": 0.3,
					"meast": 0.3,
					"africa": 0.1
			}, {
					"title": "",
					"year": "2006",
					"europe": 2.8,
					"namerica": 2.9,
					"asia": 2.4,
					"lamerica": 0.3,
					"meast": 0.3,
					"africa": 0.1
			}],
			"valueAxes": [{
					"stackType": "100%",
					"axisAlpha": 0,
					"gridAlpha": 0,
					"labelsEnabled": false,
					"position": "left"
			}],
			"graphs": [{
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Europe",
					"type": "column",
					"valueField": "europe"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "North America",
					"type": "column",
					"valueField": "namerica"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Asia-Pacific",
					"type": "column",
					"valueField": "asia"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Latin America",
					"type": "column",
					"valueField": "lamerica"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Middle-East",
					"type": "column",
					"valueField": "meast"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Africa",
					"type": "column",
					"valueField": "africa"
			}],
			"marginTop": 30,
			"marginRight": 0,
			"marginLeft": 100,
			"marginBottom": 40,
			"autoMargins": false,
			"categoryField": "title",
			"categoryAxis": {
					"gridPosition": "start",
					"axisAlpha": 0,
					"gridAlpha": 0
			},
			"export": {
				"enabled": true
			 }

/*			"type": "pie",
			"startDuration": 0,
			 "theme": "light",
			"addClassNames": true,
			"legend":{
				"position":"bottom",
				"marginRight":100,
				"autoMargins":true,
				divId: "legenddiv"
			},
			"innerRadius": "5%",
			"defs": {
				"filter": [{
					"id": "shadow",
					"width": "200%",
					"height": "200%",
					"feOffset": {
						"result": "offOut",
						"in": "SourceAlpha",
						"dx": 0,
						"dy": 0
					},
					"feGaussianBlur": {
						"result": "blurOut",
						"in": "offOut",
						"stdDeviation": 5
					},
					"feBlend": {
						"in": "SourceGraphic",
						"in2": "blurOut",
						"mode": "normal"
					}
				}]
			},
			"dataProvider": [
				{ "title": sortIE[0],"percentage": finalIE[sortIE[0]] },
				{ "title": sortIE[1],"percentage": finalIE[sortIE[1]] },
				{ "title": sortIE[2],"percentage": finalIE[sortIE[2]] },
				{ "title": sortIE[3],"percentage": finalIE[sortIE[3]] },
				{ "title": sortIE[4],"percentage": finalIE[sortIE[4]] },
				{ "title": sortIE[5],"percentage": finalIE[sortIE[5]] },
				{ "title": sortIE[6],"percentage": finalIE[sortIE[6]] },
				{ "title": sortIE[7],"percentage": finalIE[sortIE[7]] },
				{ "title": sortIE[8],"percentage": finalIE[sortIE[8]] },
				{ "title": sortIE[9],"percentage": finalIE[sortIE[9]] },
				{ "title": sortIE[10],"percentage": finalIE[sortIE[10]] }
			],
			"valueField": "percentage",
			"titleField": "title",
			"export": {
				"enabled": true
			},
			"responsive": {
				"enabled": true
			},
			"titles": [
				{
					"text": "Ingresos Estatales",
					"size": 15
				}
			]*/
		});
		var externalLegend = new AmCharts.AmLegend();
		chartEgrEst.addLegend(externalLegend, "legenddiv");
		
		// Input data
		if (inputData.ObraComp === "ObraCompl_Completa") {
			$scope.ObraComp = "Pintura en cruces peatonales, bolardos, banqueta y guías táctiles.";
		}
		if (inputData.ObraComp === "ObraCompl_Semi" ) {
			$scope.ObraComp = "Sólo pintura en cruces peatonales y bolardos.";
		}
		if (inputData.ObraComp === "ObraCompl_Basica") {
			$scope.ObraComp = "Sólo pintura en cruces peatonales.";
		}

		if (inputData.TipoDeBacheo === "BacheoSuperficial") {
			$scope.TipoDeBacheo = "Bacheo superficial";
		}
		if (inputData.TipoDeBacheo === "Slurry") {
			$scope.TipoDeBacheo = "Bacheo tipo slurry";
		}
		if (inputData.TipoDeBacheo === "BacheoProfundo") {
			$scope.TipoDeBacheo = "Bacheo profundo";
		}
		if (inputData.TipoDeBacheo === "BacheoPromedio") {
			$scope.TipoDeBacheo = "Bacheo promedio";
		}
		if (inputData.MantenimientoAnual) {
			$scope.MantenimientoAnual === "SinMantAnual" ? "Sin mantenimiento anual" : "Con mantenimiento anual";
		}
		if (inputData.senalizacion) {
			$scope.senalizacion === "MinSenalHor" ? "Los mínimos requeridos (señalización horizontal)" : "Señalización completa (señalización horizontal, señalización vertical)";
		}

		$scope.infraestructura = inputData.infraestructura;
		$scope.tipo_calle = inputData.tipo_calle;
		$scope.KmEvaluables = inputData.KmEvaluables;
		$scope.Anchoefectivo = inputData.Anchoefectivo;
		$scope.Sentidos = inputData.Sentidos;
		$scope.AnchoCalle = inputData.AnchoCalle;
		$scope.IntersSemaf = inputData.IntersSemaf;
		$scope.IntersTotales = inputData.IntersTotales;
		$scope.PozosProyecto = inputData.PozosProyecto;
		$scope.RejillasProyecto = inputData.RejillasProyecto;
		$scope.Cocheras = inputData.Cocheras;
		$scope.Biciestacionamientos = inputData.Biciestacionamientos;
		$scope.senalizacion = inputData.senalizacion;
		$scope.modalidad = "Calles";
		$scope.area =  area.municipio ? area.estado +" - "+ area.municipio : area.estado ;

		// Total
		/*
		delete sumTotal.egresos;
		delete sumTotal.ingresos;
		delete sumTotal.options;
		delete sumTotal.senalizacion;

		function sum( obj ) {
			var sumAdd = 0;
			for( var el in obj ) {
				if( obj.hasOwnProperty(el) ) {
					sumAdd += parseFloat(obj[el]);
				}
			}
			return sumAdd;
		}

		$scope.total = sum(sumTotal);
		*/
	};

	SummaryController.$inject = ['$document','$timeout', '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter', '$stateParams', '$rootScope'];

	angular.module('emus.summary', [])
		.controller('SummaryController', SummaryController);
}());