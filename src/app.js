console.log('NYU Bus App.');

/********************* Bus Stations. */
/* Dictionary mapping NYU bus stations to their GPS locations. */
var busStations = {
  'Centre/Kenmare': {
    latitude: 40.7213051,
    longitude: -73.9974512
  },
  '715 Broadway': {
    latitude: 40.729472,
    longitude: -73.99384800000001
  }
};

/* Bus B bus schedule. */
var busSchedule = {
  'Centre/Kenmare': [
    '08:07', '08:22', '08:42', '08:57', '09:07', '09:12', '09:18', '09:37',
    '09:52', '10:02', '10:12', '10:27', '10:42', '10:47', '11:07', '11:27',
    '11:47', '12:02', '12:32', '12:47', '13:12', '13:27', '14:02', '14:27',
    '14:42', '15:22', '15:52', '16:07', '16:47', '17:17', '17:32', '18:02',
    '18:12', '18:47', '19:27', '20:02', '20:17', '20:37', '21:02', '21:32',
    '22:07', '22:42', '23:37'
  ],

  '715 Broadway': [
    '08:00', '08:35', '09:15', '09:30', '09:50', '10:05', '10:20', '10:45',
    '11:05', '11:25', '11:40', '12:10', '12:25', '12:50', '13:05', '13:40',
    '14:05', '14:20', '15:00', '15:30', '15:45', '16:25', '16:55', '17:10',
    '17:40', '17:50', '18:25', '19:05', '19:40', '19:55', '20:15', '20:40',
    '21:10', '21:15', '21:20', '21:45', '22:20', '23:15', '23:45'
   ]
};

/** Get the next n busses for the given bus.
 * Returns an <= n length array of busses upon success.
 * Returns an empty array if there are no more upcoming busses.
*/
function nextBus(bus, n) {
  /* Get the current time in the same format as the bus schedule times. */
  var today = new Date();
  var nowString = today.getHours().toString() + ':' + today.getMinutes().toString();
  console.log('current time=' + nowString);

  /* Scan through the array to find the next bus time. */
  var i = 0;
  for (i = 0; i < busSchedule[bus].length; i++) {
    if (nowString < busSchedule[bus][i]) break;
  }

  if (i > busSchedule[bus].length) return [];  // no busses remaining.
  var times = [];
  console.log('i=' + i + '\tt=' + busSchedule[bus][i]);
  for (var j = i; (j < (i + n)) && (j < busSchedule[bus].length); j++) {
    times.push(busSchedule[bus][j]); 
  }
  return times;
}

function nearestBusStop(pos) {
  var minDist = 1000;
  var minStation = '';
  for (var key in busStations) {
    if (busStations.hasOwnProperty(key)) {
      var d = distance(pos.coords, busStations[key]);
      console.log(key, ': ', d);
      if (d < minDist) {
        minDist = d;
        minStation = key;
      }
    }
  }
  return minStation;
}

function toRadians(num) {
  return num * (Math.PI / 180);  
}

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

simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Pressed ' + e.button + '!');
});

/************************ Location code. */
var locationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + 'lon= ' + pos.coords.longitude);

  var busStop = nearestBusStop(pos);
  console.log('nearestBusStop= ' + busStop);
  simply.subtitle(busStop);

  var times = nextBus(busStop, 3);
  console.log('next N busses=' + times);
  var timeBody = '';
  times.forEach(function(time) {
    timeBody += time + '\n';
  });
  simply.body(timeBody);
}

function locationError(err) {
  console.log('location error: (' + err.code + '): ' + err.message);
  simply.subtitle('Could not obtain your current location.');
}

/* The text to display on launch. */
simply.text({
  title: 'NYU Bus B',
  body: 'Obtaining the bus schedule now...',
}, true);

navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);