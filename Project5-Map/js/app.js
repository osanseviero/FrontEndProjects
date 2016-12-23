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
    {title: 'Facebook', location: {lat: 19.426087, lng: -99.203319}}
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
      var formattedFSLink = getFoursquareInfo(marker.position.lat, marker.position.lng, function(data) {
        infoWindow.marker = marker;
        var content = '<h1>' + '<h1>' + marker.title + '</h1>'
        console.log(data.twitter);
        if(data.twitter) {
          content += '<a href="https://twitter.com/' + data.twitter + '">Twitter</a>';
        }
        console.log(data.count);
        content += "<h2>Count " + data.count + "</h2>";
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        infoWindow.addListener('cloclick', function() {
            infoWindow.setMarker(null);
        });
      });
  }
};


/*Get twitter, phone, and count of a specific location*/
function getFoursquareInfo(lat, lng, callback) {
  var foursquareLink = 'https://api.foursquare.com/v2/venues/search?ll=%lat%,%lon%&client_id=FFNGZD4W0OKDN31OFQPYYHVUYL3KJJOZJ1OHV4LDBO0VW2OX&client_secret=ZQAKAY5RWOHWTFP0PM1LO5GNY00RIZMOCQAJOIHPO3YA1NPF&v=20120609';

  var formattedFSLink = foursquareLink.replace('%lat%', lat);
  formattedFSLink = formattedFSLink.replace('%lon%', lng);

  $.getJSON(formattedFSLink).then(function(data){
    console.log(data.response.venues[0]);
    callback({
      count: data.response.venues[0].stats.checkinsCount,
      phone: data.response.venues[0].contact.photo,
      twitter: data.response.venues[0].contact.twitter
    });
  });
};


