var Location = {};
var UI = require('ui');

// Location options variable for getting the current position of the user.
var locationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

// Convert degrees to radians.
function toRadians(deg) {
  return deg * Math.PI / 180;
}

// Calculate the "as-the-crow-flies" distance between two gps coordinates.
function distance(pos1, pos2) {
 var R = 6371000;// metres
 var φ1 = toRadians(pos1.latitude);
 var φ2 = toRadians(pos2.latitude);
 var Δφ = toRadians(pos2.latitude-pos1.latitude);
 var Δλ = toRadians(pos2.longitude-pos1.longitude);

 var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
         Math.cos(φ1) * Math.cos(φ2) *
         Math.sin(Δλ/2) * Math.sin(Δλ/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

 var d = R * c;
 return d;
}

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + 'lon= ' + pos.coords.longitude);
  return pos;
}

function locationError(err) {
  console.log('location error: (' + err.code + '): ' + err.message);
  var card = new UI.Card();
  card.body('Could not obtain your current location.');
  card.show();
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError,
                                           locationOptions);
}


/* Public functions. */
Location.getCurrentPosition = getCurrentPosition;
Location.distance = distance;

module.exports = Location;