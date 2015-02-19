/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

// var Bus = require('bus');
var Bus = require('bus');
var UI = require('ui');

// The number of bus times to display.
var NUM_BUS_TIMES = 3;

var currentCard;    // current card to display on screen
var currentRoute;   // current route
Bus.test();


currentCard.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

currentCard.on('click', 'select', function(e) {
  var card = new UI.Card({
    title: 'NYU Bus B',
    body: 'Determining your nearest bus stop...'
  });
  card.show();
  Bus.getNextBus(currentRoute, NUM_BUS_TIMES);
});

currentCard.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});


function main() {
  currentRoute = 'b';
  currentCard = new UI.Card({
    title: 'NYU Bus B',
    body: 'Determining your nearest bus stop...'
  });

  currentCard.show();
  Bus.getNextBus(currentRoute, NUM_BUS_TIMES);
}

main();