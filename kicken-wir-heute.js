Dates = new Mongo.Collection('dates');
Players = new Mongo.Collection('players');


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    answer: function(){
    // überprüfen ob der Tag dem nächsten Termin entspricht und ob genug Spieler angemeldet sind
      return 'Ja';
    }

    // Wenn richtiger Tag und genug Spieler: Antwort "Ja"; falls nicht Zeit bis zum nächsten Termin anzeigen und Möglichkeit zum Anmelden
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
