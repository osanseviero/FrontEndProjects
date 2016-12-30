var map;
var lastMarker = null;
var largeInfoWindow;
var currentOpen = '';

var locations = [
  {name: 'Centraal', location: {lat: 19.412080, lng: -99.180513}, marker: null},
  {name: 'Google México', location: {lat: 19.428222, lng: -99.206510}, marker: null},
  {name: '500 Startups', location: {lat: 19.425414, lng: -99.162448}, marker: null},
  {name: 'Nearsoft DF', location: {lat: 19.412991, lng: -99.164425}, marker: null},
  {name: 'WeWork Varsovia', location: {lat: 19.424371, lng: -99.167971}, marker: null},
  {name: 'Facebook', location: {lat: 19.426087, lng: -99.203319}, marker: null},
  {name: 'Centro de Cultura Digital', location: {lat: 19.423134, lng: -99.1763432}, marker: null}
];

var ViewModel = function() {
  var self = this;
  self.locations = ko.observableArray(locations);

  // Name for filter
  self.name = ko.observable();

  /*Activate the marker when a button in the list is clicked*/
  activate = function(button) {
    locations.forEach(function(location, idx) {
      if(location.marker.name == button.name) {
        populateInfoWindow(location.marker, largeInfoWindow);
      }
    });
  };

  /*Filter locations based on input*/
  self.filteredLocations = ko.computed(function() {
    if(self.name() === undefined || self.name() === "") {
      // Try to initiate the map (for initiation)
      try {
        locations.forEach(function(location, idx) {
          location.marker.setVisible(true);
        })
      }
      catch(err) {
        // Do nothing
      }
      return self.locations();
    }
    // Filter the markers and buttons
    else {
      var filtered = [];
      ko.utils.arrayForEach(this.locations(), function(location) {
        if(location.name.indexOf(self.name()) >= 0) {
          filtered.push(location);
          location.marker.setVisible(true);
        }
        else {
          location.marker.setVisible(false);
          console.log(currentOpen + " and " + location.name);
          if(currentOpen === location.name) {
            console.log("closing");
            largeInfoWindow.close();
          }
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

  markers = [];

  largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  google.maps.event.addDomListener(window, "resize", function() {
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
  });

  // Create every marker and add event listeners
  for(var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var name = locations[i].name;
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        name: name,
        animation: google.maps.Animation.DROP,
        id: i
    });
   
    bounds.extend(marker.position);
    map.fitBounds(bounds)

    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    });

    // Stop animation if infoWindow is closed
    google.maps.event.addListener(largeInfoWindow,'closeclick',function(){
      lastMarker.setAnimation(null);
    });

    locations[i].marker = marker;
  }
}

/* Fill the information window with information from FourSquare API*/
function populateInfoWindow(marker, infoWindow) {
  marker.setAnimation(google.maps.Animation.BOUNCE)
  infoWindow.marker = marker;
  currentOpen = marker.name;

  // Stop the animation of the previous marker
  if(lastMarker !== null) lastMarker.setAnimation(null);
  lastMarker = marker;

  // Get the information and calls the callback.
  getFoursquareInfo(marker.name, marker.position.lat, marker.position.lng, function(data) {
    var content = '<h1>' + '<h1>' + marker.name + '</h1>';
    
    // Handle JSON request error
    if(data.status === 400) {
      content += "<p>There was an error retrieving information from FourSquare API</p>";
    }
    // Handle no information error
    else if(data.status === 300) {
      content += '<h2>No information found</h2>';
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
  });

  // Handle when the website waits for the information
  infoWindow.open(map, marker);
  infoWindow.setContent('<h2> Retrieving information from FourSquare </h2>');
  
};

/*Get twitter, phone, and count of a specific location*/
function getFoursquareInfo(name, lat, lng, callback) {
  var foursquareLink = 'https://api.foursquare.com/v2/venues/search?ll=%lat%,%lon%&client_id=FFNGZD4W0OKDN31OFQPYYHVUYL3KJJOZJ1OHV4LDBO0VW2OX&client_secret=ZQAKAY5RWOHWTFP0PM1LO5GNY00RIZMOCQAJOIHPO3YA1NPF&v=20120609';

  var formattedFSLink = foursquareLink.replace('%lat%', lat);
  formattedFSLink = formattedFSLink.replace('%lon%', lng);

  // JSON request to FourSquare API
  var found = false;
  $.getJSON(formattedFSLink).then(function(data){
    data.response.venues.forEach(function(venue, idx){
      if(venue.name == name) {
        callback({
          name: name,
          count: venue.stats.checkinsCount,
          phone: venue.contact.phone,
          twitter: venue.contact.twitter,
          status: 200
        });
        found = true;
      }
      if(idx+1 == data.response.venues.length && !found) {
        callback({name: name, status: 300});
      }
    })
  }).fail(function() {
    callback({status: 400});
  });
};