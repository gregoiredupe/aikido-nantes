var map = new ol.Map({
	target : 'mapdiv',
	layers : [ new ol.layer.Tile({
		source : new ol.source.OSM()
	}) ],
	view : new ol.View({
		center : ol.proj.fromLonLat([ -1.5650, 47.2164 ]),
		zoom : 12
	})
});

function createPin (lon, lat) {
	var pinFeature = new ol.Feature({
		geometry : new ol.geom.Point(ol.proj.fromLonLat([ lon, lat ])),
		name : 'Aikido-Nantes'
	});
	
	var pinStyle = new ol.style.Style({
		image : new ol.style.Icon({
			src : 'img/mapMarker.png',
			anchor : [ 0.5 , 1 ]
		})
	});
	pinFeature.setStyle(pinStyle);
	return pinFeature;
}

var layer = new ol.layer.Vector({
	source : new ol.source.Vector({
		features : [
				createPin(-1.52728, 47.23059),
				createPin(-1.53604, 47.20954),
				createPin(-1.57979, 47.21423),
				createPin(-1.60387, 47.21056)
			]
	})
});
map.addLayer(layer);
