var map;
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.425286, lng: -99.189031},
    zoom: 14
  });

  var markers = [];
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var locations = [
    {title: 'Centraal', location: {lat: 19.412080, lng: -99.180513}},
    {title: 'Google Mexico', location: {lat: 19.428222, lng: -99.206510}},
    {title: '500 Startups', location: {lat: 19.425414, lng: -99.162448}},
    {title: 'Nearsoft', location: {lat: 19.412991, lng: -99.164425}},
    {title: 'WeWork', location: {lat: 19.424371, lng: -99.167971}},
  ];

  for(var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
      })
      markers.push(marker);

      bounds.extend(marker.position);
      marker.addListener('click', function() {
          populateInfoWindow(this, largeInfoWindow)
      });
  }
}

function populateInfoWindow(marker, infoWindow) {
  if(infoWindow.marker != marker) {
      infoWindow.marker = marker;
      infoWindow.setContent('<div>' + marker.title + '</div>');
      infoWindow.open(map, marker);
      infoWindow.addListener('cloclick', function() {
          infoWindow.setMarker(null);
      });
  }
};