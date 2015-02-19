var Bus = {};
var UI = require('ui');
var Location = require('location');
var Routes = require('routes');

// Get the next `n` bus times for a given bus `route`.
// Returns 0 on success, -1 on error.
function getNextBus(route, n) {
  var card = new UI.Card();

  var pos = Location.getCurrentPosition();
  var stop = nearestBusStop(pos);
  card.subtitle(stop);
  console.log('nearestBusStop= ' + stop);

  var times = nextBus(route, stop, n);
  if (times.length === 0) {
    console.log('Busses are offline.');
    return -1;
  }

  var timeBody = '';
  times.forEach(function(time) {
    timeBody += time + '\n';
  });
  card.body(timeBody);
  return 0;
}

// Get the next `n` bus times for `stop` on `route`.
// Return sorted ascending array of bus times on success of length <= n
// Return an empty array on failure.
function nextBus(route, stop, n) {
  var today = new Date();
  var nowString = today.getHours().toString() + ':' +
    today.getMinutes().toString();
  console.log('current time=' + nowString);

  var busTimes = Routes.busTimes(route);
  if (busTimes.length === 0) return [];  // route/stop is/are invalid.

  // Scan through the array to find the next bus time.
  var i = 0;
  for (i = 0; i < busTimes.length; i++) {
    if (nowString < busTimes[i]) break;
  }

  // No busses remaining.
  if (i > busTimes.length) return [];

  var times = [];
  console.log('i=' + i + '\tt=' + busTimes[i]);
  for (var j = i; (j < (i + n)) && (j < busTimes.length); j++) {
    times.push(busTimes[j]);
  }
  return times;
}

// Get the nearest bus stop from `pos` on `route`.
// Return empty string on failure.
function nearestBusStop(route, pos) {
  var minDist = 1000;
  var minStation = '';

  var stations = Routes.stations(route);
  for (var key in stations) {
    if (stations.hasOwnProperty(key)) {
      var d = Location.distance(pos.coords, stations[key]);
      console.log(key, ': ', d);
      if (d < minDist) {
        minDist = d;
        minStation = key;
      }
    }
  }
  return minStation;
}


/* Public functions. */
Bus.getNextBus = getNextBus;
Bus.nextBus = nextBus;
Bus.nearestBusStop = nearestBusStop;
Bus.test = function() { console.log("hello"); };

module.exports = Bus;