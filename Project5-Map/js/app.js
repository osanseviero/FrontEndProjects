var map;
var lastMarker = null;

var originalLocations = [
  {title: 'Centraal', location: {lat: 19.412080, lng: -99.180513}},
  {title: 'Google México', location: {lat: 19.428222, lng: -99.206510}},
  {title: '500 Startups', location: {lat: 19.425414, lng: -99.162448}},
  {title: 'Nearsoft DF', location: {lat: 19.412991, lng: -99.164425}},
  {title: 'WeWork Varsovia', location: {lat: 19.424371, lng: -99.167971}},
  {title: 'Facebook', location: {lat: 19.426087, lng: -99.203319}},
  {title: 'Centro de Cultura Digital', location: {lat: 19.423134, lng: -99.1763432}}
];

var locations = originalLocations;

function Location(title, lat, lng) {
  var self = this;
  self.title = title,
  self.location = {lat, lng};
}

var ViewModel = function() {
  var self = this;

  self.locations = ko.observableArray([
      new Location('Centraal', 19.412080, -99.180513),
      new Location("Google Mexico", 19.425414, -99.162448),
      new Location("500 Startups", 19.425424, -99.162458),
      new Location("Nearsoft DF", 19.412991, -99.164425),
      new Location("WeWork Varsovia", 19.424371, -99.167971),
      new Location("Facebook", 19.426087, -99.203319)
  ]);

  self.name = ko.observable();

  /*Filter locations based on input*/
  self.filteredLocations = ko.computed(function() {
    if(self.name() === undefined || self.name() === "") {
      locations = originalLocations;

      // Load the map. Use try to prevent calling the function before defining it
      try {
        initMap();
      }
      catch(err) {
        // Do nothing
      }
      return self.locations();
    }
    else {
      var filtered = [];
      locations = [];
      ko.utils.arrayForEach(this.locations(), function(location) {
        if(location.title.indexOf(self.name()) >= 0) {
          filtered.push(location);
          locations.push(location);
          initMap();
        }
      });
      return ko.observableArray(filtered);
    }
    
  }, this);

};

ko.applyBindings(new ViewModel());

function initMap() {
  // Create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.425286, lng: -99.189031},
    zoom: 13,
  });

  var markers = [];
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  google.maps.event.addDomListener(window, "resize", function() {
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
  });

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
      
      // Handle JSON request error
      if(data === 400) {
        content += "<p>There was an error retrieving information from FourSquare API</p>";
      }

      // Fill the information window with the information that exists for specific record
      else {
        if(data.twitter) {
          content += '<a href="https://twitter.com/' + data.twitter + '">Twitter</a>';
        }
        if(data.count) {
          content += "<p>Visit Count " + data.count + "</p>";
        }
        if(data.phone) {
          content += '<p>Phone: ' + data.phone + '</p>';
        }
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
    }, 2000);
  }
};


/*Get twitter, phone, and count of a specific location*/
function getFoursquareInfo(title, lat, lng, callback) {
  var foursquareLink = 'https://api.foursquare.com/v2/venues/search?ll=%lat%,%lon%&client_id=FFNGZD4W0OKDN31OFQPYYHVUYL3KJJOZJ1OHV4LDBO0VW2OX&client_secret=ZQAKAY5RWOHWTFP0PM1LO5GNY00RIZMOCQAJOIHPO3YA1NPF&v=20120609';

  var formattedFSLink = foursquareLink.replace('%lat%', lat);
  formattedFSLink = formattedFSLink.replace('%lon%', lng);

  // JSON request to FourSquare API
  $.getJSON(formattedFSLink).then(function(data){
    data.response.venues.forEach(function(venue, idx){
      if(venue.name == title) {
        callback({
          count: venue.stats.checkinsCount,
          phone: venue.contact.phone,
          twitter: venue.contact.twitter
        });
      }
    })
  }).fail(function() {
    callback(400);
  });
};