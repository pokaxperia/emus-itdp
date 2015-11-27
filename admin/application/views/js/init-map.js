var map = "";
var markersGroupAlertas = new L.LayerGroup();
var markersGroupReportes = new L.LayerGroup();

$(document).ready( function() {
	initMap();
	initMapReportes(reportes);
	
	$(".link-section").click( function () {
		var idSection = $(this).attr("id");
		
		$(".link-section").removeClass("hover-section");
		$(this).addClass("hover-section");
		
		if(idSection == "alertas") {
			initMapAlertas(alertas);
		} else {
			initMapReportes(reportes);
		}
	});
});

function initMap() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
	map = L.mapbox.map('map', 'mapbox.streets').setView([-12.047355, -76.996276], 14);
}

/*Alertas*/
function initMapAlertas(data) {
	//Layer Group markers
	markersGroupAlertas.clearLayers();
	markersGroupReportes.clearLayers();

	var features = new Array;
	var geojson = {
		"type": "FeatureCollection",
		"features": ""
	};

	for(var x in data) {
		var marker = {
			"type": "Feature",
			"properties": {
				"id_alerta": data[x].id_alerta,
				"titulo": data[x].usuario,
				"id_user": data[x].id_user
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					data[x].longitude,
					data[x].latitude
				]
			}
		};
		
		features.push(marker);
	}

	geojson.features = features;

	/*load geojson*/
	var mapPolygons   = L.geoJson(geojson, {
		onEachFeature: onEachFeature
	});

	markersGroupAlertas.addTo(map);

	function onEachFeature(feature, layer) {
		var marker = new L.marker(layer._latlng, {
			icon: L.mapbox.marker.icon({
				'marker-size': 'medium',
				'marker-symbol': "triangle",
				'marker-color': "#D5D274"
			}),
			"id_alerta": feature.properties.id_reporte,
			"titulo": feature.properties.titulo,
			"id_user": feature.properties.id_user
		});
		
		marker.bindPopup(feature.properties.titulo);
		
		marker.on("click", function(e) {
			markersGroupAlertas.eachLayer(function (layer) {
				layer.setIcon(L.mapbox.marker.icon({
					'marker-size': 'medium',
					'marker-symbol': "triangle",
					'marker-color': "#D5D274"
				}));
			});
			
			e.target.setIcon(L.mapbox.marker.icon({
				'marker-size': 'large',
				'marker-symbol': "triangle",
				'marker-color': "#D5D274"
			}));
		});
		
		markersGroupAlertas.addLayer(marker);
	}
}


/*Reportes*/
function initMapReportes(data) {
	//Layer Group markers
	markersGroupAlertas.clearLayers();
	markersGroupReportes.clearLayers();

	var features = new Array;
	var geojson = {
		"type": "FeatureCollection",
		"features": ""
	};

	for(var x in data) {
		var marker = {
			"type": "Feature",
			"properties": {
				"id_reporte": data[x].id_reporte,
				"titulo": data[x].titulo,
				"id_categoria": data[x].id_categoria,
				"categoria": data[x].categoria,
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					data[x].longitude,
					data[x].latitude
				]
			}
		};
		
		features.push(marker);
	}

	geojson.features = features;

	/*load geojson*/
	var mapPolygons   = L.geoJson(geojson, {
		onEachFeature: onEachFeature
	});

	markersGroupReportes.addTo(map);

	function onEachFeature(feature, layer) {
		var iconObj = getIcon(feature.properties.id_categoria);
		
		var marker = new L.marker(layer._latlng, {
			icon: L.mapbox.marker.icon({
				'marker-size': 'medium',
				'marker-symbol': iconObj.icon,
				'marker-color': iconObj.color
			}),
			"id_reporte": feature.properties.id_reporte,
			"titulo": feature.properties.titulo,
			"id_categoria": feature.properties.id_categoria,
			"categoria": feature.properties.categoria
		});
		
		marker.bindPopup(feature.properties.titulo);
		
		marker.on("click", function(e) {
			markersGroupReportes.eachLayer(function (layer) {
				var iconObj2 = getIcon(layer.options.id_categoria);
				
				layer.setIcon(L.mapbox.marker.icon({
					'marker-size': 'medium',
					'marker-symbol': iconObj2.icon,
					'marker-color': iconObj2.color
				}));
			});
			
			e.target.setIcon(L.mapbox.marker.icon({
				'marker-size': 'large',
				'marker-symbol': iconObj.icon,
				'marker-color': iconObj.color
			}));
		});
		
		markersGroupReportes.addLayer(marker);
	}
}

function getIcon(id_categoria) {
	var vicon = "triangle";
	var vcolor = "#1E90FF";
	
	if(id_categoria == 1) {
		var vicon = "city";
		var vcolor = "#1E90FF";
	} else if(id_categoria == 2) {
		var vicon = "bus";
		var vcolor = "#BE7A8E";
	} else if(id_categoria == 3) {
		var vicon = "police";
		var vcolor = "#7C952E";
	}
	
	return { icon : vicon, color: vcolor };
}
