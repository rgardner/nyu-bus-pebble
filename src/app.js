/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var Bus = require('bus');
var UI = require('ui');
var Routes = require('routes');
var Vector2 = require('vector2');

// The number of bus times to display.
var NUM_BUS_TIMES = 3;

//
var current_bus = 'b';

var main = new UI.Card({
  title: 'NYU Bus B',
  body: 'Determinging your nearest bus stop...'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
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

main.on('click', 'select', function(e) {
  var card = new UI.Card();
  card.title = 'NYU Bus B';
  card.body =  'Determining your nearest bus stop...';
  Bus.nextNTimes(currentBus, NUM_BUS_TIMES);
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
