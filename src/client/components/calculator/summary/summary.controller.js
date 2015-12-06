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
		porcentajeIngresos1000,
		porcentajeEgresos,
		porcentajeEgresos1000;
		init();
		
		function init(){

			setResults = sessionStorage.getItem('results');
			area = JSON.parse(sessionStorage.getItem('modal'));
			itemResult = JSON.parse(setResults);
			console.log(itemResult);
			inputData = itemResult.options;
			sumTotal = itemResult;
			$scope.inputResult = itemResult;
			
			if(setResults){
				Stacked(itemResult);
			}

			$scope.first = {
				open: false
			};
			
		}
		
		function Stacked(items){
			porcentajeIngresos = items.ingresos.porcentajes;
			porcentajeIngresos1000 = items.ingresos.porcentajes1000;
			delete porcentajeIngresos.cveestado;
			delete porcentajeIngresos.nomestado;
			delete porcentajeIngresos1000.cveestado;
			delete porcentajeIngresos1000.nomestado;

			porcentajeEgresos = items.egresos.porcentajes;
			porcentajeEgresos1000 = items.egresos.porcentajes1000;
			delete porcentajeEgresos.cveestado;
			delete porcentajeEgresos.nomestado;
			delete porcentajeEgresos1000.cveestado;
			delete porcentajeEgresos1000.nomestado;
			
			// Charts Ingreos
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
						"titulo": "Ingresos Promedio",
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
						"titulo": "Ingresos cada 1000 hab.",
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
						"labelsEnabled": true,
						"position": "top"
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
				"marginRight": 20,
				"marginLeft": 80,
				"marginBottom": 40,
				"autoMargins": false,
				"categoryField": "titulo",
				"categoryAxis": {
						"gridPosition": "middle",
						"axisAlpha": 0,
						"gridAlpha": 0,
						"ignoreAxisWidth": true,
						"autoWrap": true
				},
				"export": {
					"enabled": true
				 }
			});

			// Chart Egresos
			var chartEgrEst = AmCharts.makeChart("Egresos", {
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
				"dataProvider": [
					{
						"titulo": "Egresos Promedio",
						"em4": porcentajeEgresos.em4,
						"em7": porcentajeEgresos.em7,
						"em10": porcentajeEgresos.em10,
						"em13": porcentajeEgresos.em13,
						"em16": porcentajeEgresos.em16,
						"em19": porcentajeEgresos.em19,
						"em22": porcentajeEgresos.em22,
						"em25": porcentajeEgresos.em25,
						"em28": porcentajeEgresos.em28,
						"em31": porcentajeEgresos.em31
					},
					{
						"titulo": "Egresos cada 1000 hab.",
						"em4": porcentajeEgresos1000.em5,
						"em7": porcentajeEgresos1000.em8,
						"em10": porcentajeEgresos1000.em11,
						"em13": porcentajeEgresos1000.em14,
						"em16": porcentajeEgresos1000.em17,
						"em19": porcentajeEgresos1000.em20,
						"em22": porcentajeEgresos1000.em23,
						"em25": porcentajeEgresos1000.em26,
						"em28": porcentajeEgresos1000.em29,
						"em31": porcentajeEgresos1000.em32
				}],
				"valueAxes": [{
						"stackType": "100%",
						"axisAlpha": 0,
						"gridAlpha": 0,
						"labelsEnabled": true,
						"position": "top"
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
						"valueField": "em4"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Cuotas y Aportaciones de Seguridad Social",
						"type": "column",
						"valueField": "em7"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Contribuciones de Mejoras",
						"type": "column",
						"valueField": "em10"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Derechos",
						"type": "column",
						"valueField": "em13"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Productos",
						"type": "column",
						"valueField": "em16"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Aprovechamientos",
						"type": "column",
						"valueField": "em19"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Participaciones federales",
						"type": "column",
						"valueField": "em22"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Aportaciones federales y estatales",
						"type": "column",
						"valueField": "em25"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Otros ingresos",
						"type": "column",
						"valueField": "em28"
				}, {
						"balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
						"fillAlphas": 0.9,
						"fillColorsField": "color",
						"fontSize": 11,
						"labelText": "[[percents]]%",
						"lineAlpha": 0.5,
						"title": "Financiamiento",
						"type": "column",
						"valueField": "em31"
				}],
				"marginTop": 30,
				"marginRight": 20,
				"marginLeft": 80,
				"marginBottom": 40,
				"autoMargins": false,
				"categoryField": "titulo",
				"categoryAxis": {
						"gridPosition": "middle",
						"axisAlpha": 0,
						"gridAlpha": 0,
						"ignoreAxisWidth": true,
						"autoWrap": true
				}
			});
			//var externalLegend = new AmCharts.AmLegend();
		}
		
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
		
		
		$scope.createPdf = function(){
			var pdf = new jsPDF('p','pt','a4');

			pdf.addHTML(document.body,function() {
				pdf.save('demo.pdf');
			});
			/*
			var summaryPdf = new jsPDF();
			summaryPdf.setFont("helvetica", "normal");
			var specialElementHandlers = {
				'.spdf': function(element, renderer){
					return true;
				}
			};
			var elements = angular.element(document.getElementsByClassName('spdf'));
			angular.forEach(elements, function(value, key) {
				summaryPdf.fromHTML(value,10, 10, {
					'elementHandlers': specialElementHandlers
				});
			});
			summaryPdf.save('test.pdf');
			*/
		}
	};

	SummaryController.$inject = ['$document','$timeout', '$modal', '$modalStack', '$window','$scope','$location', '$state', '$log', '$filter', '$stateParams', '$rootScope'];

	angular.module('emus.summary', [])
		.controller('SummaryController', SummaryController);
}());