(function(){
	/**
	*  Calculator Module
	*/
	'use strict';

	var SummaryController = function($document,$timeout, $modal, $modalStack, $window, $scope,$location, $state, $log, $filter, $stateParams, $rootScope){
		var area,
		sumTotal,
		subTotal,
		inputData,
		inputResult,
		setResults,
		itemResult,
		itemsValues,
		finalEE = {},
		finalEM = {},
		finalIE = {},
		finalIM = {},
		itemsEgrEst,
		itemsEgrMun,
		itemsIngEst,
		itemsIngMun,
		itemsEE,
		itemsEM,
		itemsIE,
		itemsIM,
		sortEE,
		sortEM,
		sortIE,
		sortIM,
		porcentajeIngresos,
		porcentajeIngresos1000;
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
			area = JSON.parse(sessionStorage.getItem('modal'));
			itemResult = JSON.parse(setResults);
			inputData = itemResult.options;
			sumTotal = itemResult
			$scope.inputResult = itemResult;
			
			if(setResults){
				porcentajeIngresos = itemResult.ingresos.porcentajes;
				porcentajeIngresos1000 = itemResult.ingresos.porcentajes1000;
				delete porcentajeIngresos.cveestado;
				delete porcentajeIngresos.nomestado;
				
				delete porcentajeIngresos1000.cveestado;
				delete porcentajeIngresos1000.nomestado;
			}

			$scope.first = {
				open: false
			};
			
		}
		

		// Charts
		
		var chartEgrEst = AmCharts.makeChart("Ingresos", {
			"type": "serial",
			"theme": "light",
			'rotate': true,
			"legend": {
					"autoMargins": false,
					"borderAlpha": 0.2,
					"equalWidths": true,
					"horizontalGap": 10,
					"markerSize": 10,
					"useGraphSettings": true,
					"valueAlign": "left",
					"valueWidth": 0
			},
			"dataProvider": [{
					"titulo": "Promedio",
					"im5": porcentajeIngresos.im5,
					"im8": porcentajeIngresos.im8,
					"im11": porcentajeIngresos.im11,
					"im14": porcentajeIngresos.im14,
					"im17": porcentajeIngresos.im17,
					"im20": porcentajeIngresos.im20,
					"im23": porcentajeIngresos.im23,
					"im26": porcentajeIngresos.im26,
					"im29": porcentajeIngresos.im29,
					"im32": porcentajeIngresos.im32,
					"im35": porcentajeIngresos.im35
			}, {
					"titulo": "Cada 1000 hab.",
					"im5": porcentajeIngresos1000.im6,
					"im8": porcentajeIngresos1000.im9,
					"im11": porcentajeIngresos1000.im12,
					"im14": porcentajeIngresos1000.im15,
					"im17": porcentajeIngresos1000.im18,
					"im20": porcentajeIngresos1000.im21,
					"im23": porcentajeIngresos1000.im24,
					"im26": porcentajeIngresos1000.im27,
					"im29": porcentajeIngresos1000.im30,
					"im32": porcentajeIngresos1000.im33,
					"im35": porcentajeIngresos1000.im36
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
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Impuestos",
					"type": "column",
					"valueField": "im5"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Cuotas y Aportaciones de Seguridad Social",
					"type": "column",
					"valueField": "im8"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Contribuciones de Mejoras",
					"type": "column",
					"valueField": "im11"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Derechos",
					"type": "column",
					"valueField": "im14"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Productos",
					"type": "column",
					"valueField": "im17"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Aprovechamientos",
					"type": "column",
					"valueField": "im20"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Participaciones federales",
					"type": "column",
					"valueField": "im23"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Aportaciones federales y estatales",
					"type": "column",
					"valueField": "im26"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Otros ingresos",
					"type": "column",
					"valueField": "im29"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Financiamiento",
					"type": "column",
					"valueField": "im32"
			}, {
					"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
					"fillAlphas": 0.9,
					"fillColorsField": "color",
					"fontSize": 11,
					"labelText": "[[percents]]%",
					"lineAlpha": 0.5,
					"title": "Disponibilidad inicial",
					"type": "column",
					"valueField": "im35"
			}],
			"marginTop": 30,
			"marginRight": 0,
			"marginLeft": 100,
			"marginBottom": 40,
			"autoMargins": false,
			"categoryField": "titulo",
			"categoryAxis": {
					"gridPosition": "middle",
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
		//chartEgrEst.addLegend(externalLegend, "legenddiv");
		
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
		if (inputData.senalizacion === "MinSenalHor") {
			$scope.senalizacion = "Los mínimos requeridos (señalización horizontal)";
		}
		if (inputData.senalizacion === "MaxSenalHor") {
			$scope.senalizacion = "Señalización completa (señalización horizontal, señalización vertical)";
		}
		inputData.MantenimientoAnual === "SinMantAnual" ? $scope.MantenimientoAnual = "Sin mantenimiento anual" : $scope.MantenimientoAnual = "Con mantenimiento anual";

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
		$scope.modalidad = "Calles";
		$scope.area =  area.municipio ? area.estado +" - "+ area.municipio : area.estado ;

		// Total
		
		delete sumTotal.egresos;
		delete sumTotal.ingresos;
		delete sumTotal.options;
		sumTotal.horizontal = sumTotal.senalizacion.horizontal;
		sumTotal.vertical = sumTotal.senalizacion.vertical;
		sumTotal.seleccionada = sumTotal.senalizacion.seleccionada;
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
	};

	SummaryController.$inject = ['$document','$timeout', '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter', '$stateParams', '$rootScope'];

	angular.module('emus.summary', [])
		.controller('SummaryController', SummaryController);
}());