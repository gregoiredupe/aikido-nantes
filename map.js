map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());

var markers = new OpenLayers.Layer.Markers("Markers");
function addMarker(markers, lon, lat) {
	var lonLat = new OpenLayers.LonLat(lon, lat).transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
	);
	var zoom = 16;
	markers.addMarker(new OpenLayers.Marker(lonLat));
}
addMarker(markers, -1.52728, 47.23059);
addMarker(markers, -1.53604, 47.20954);
addMarker(markers, -1.57979, 47.21423);
addMarker(markers, -1.60387, 47.21056);
var center = new OpenLayers.LonLat(-1.5650, 47.2164).transform(
		new OpenLayers.Projection("EPSG:4326"),
		map.getProjectionObject()
);
map.addLayer(markers);
map.setCenter(center, 13);
