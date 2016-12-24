var map;
var lastMarker = null;

function initMap() {
  // Create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.425286, lng: -99.189031},
    zoom: 14
  });

  var markers = [];
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var locations = [
    {title: 'Centraal', location: {lat: 19.412080, lng: -99.180513}},
    {title: 'Google México', location: {lat: 19.428222, lng: -99.206510}},
    {title: '500 Startups', location: {lat: 19.425414, lng: -99.162448}},
    {title: 'Nearsoft DF', location: {lat: 19.412991, lng: -99.164425}},
    {title: 'WeWork Varsovia', location: {lat: 19.424371, lng: -99.167971}},
    {title: 'Facebook', location: {lat: 19.426087, lng: -99.203319}},
    {title: 'Centro de Cultura Digital', location: {lat: 19.423134, lng: -99.1763432}}
  ];

  // Create every marker and add event listeners
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
        populateInfoWindow(this, largeInfoWindow);
      });

      // Stop animation if infoWindow is closed
      google.maps.event.addListener(largeInfoWindow,'closeclick',function(){
        lastMarker.setAnimation(null);
      });
  }
}

/* Fill the information window with information from FourSquare API*/
function populateInfoWindow(marker, infoWindow) {
  if(infoWindow.marker != marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE)
    infoWindow.marker = marker;
    var recData = false;

    // Stop the animation of the previous marker
    if(lastMarker !== null) lastMarker.setAnimation(null);
    lastMarker = marker;

    // Get the information and calls the callback.
    getFoursquareInfo(marker.title, marker.position.lat, marker.position.lng, function(data) {
      var content = '<h1>' + '<h1>' + marker.title + '</h1>';

      if(data.twitter) {
        content += '<a href="https://twitter.com/' + data.twitter + '">Twitter</a>';
      }
      if(data.count) {
        content += "<p>Visit Count " + data.count + "</p>";
      }
      if(data.phone) {
        content += '<div>Phone: ' + data.phone + '"</div>';
      }
      
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      recData = true;
    });

    // Handle when the website waits for the information
    infoWindow.open(map, marker);
    infoWindow.setContent('<h2> Retrieving information from FourSquare </h2>');

    // Handle when there is no information
    setTimeout(function() {
      if(!recData) {
        var content = '<h1>' + '<h1>' + marker.title + '</h1>';
        content += '<div>No data available for this location</div>';
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      }
    }, 1000)
  }
};


/*Get twitter, phone, and count of a specific location*/
function getFoursquareInfo(title, lat, lng, callback) {
  var foursquareLink = 'https://api.foursquare.com/v2/venues/search?ll=%lat%,%lon%&client_id=FFNGZD4W0OKDN31OFQPYYHVUYL3KJJOZJ1OHV4LDBO0VW2OX&client_secret=ZQAKAY5RWOHWTFP0PM1LO5GNY00RIZMOCQAJOIHPO3YA1NPF&v=20120609';

  var formattedFSLink = foursquareLink.replace('%lat%', lat);
  formattedFSLink = formattedFSLink.replace('%lon%', lng);

  // JSON request to FourSquare API
  $.getJSON(formattedFSLink).then(function(data){
    for(var i = 0; i < data.response.venues.length; i++) {
      if(data.response.venues[i].name == title) {
        console.log(data.response.venues[i]);
        callback({
          count: data.response.venues[i].stats.checkinsCount,
          phone: data.response.venues[i].contact.phone,
          twitter: data.response.venues[i].contact.twitter
        });
        i = data.response.venues.length;
      }
    }
  });
};


