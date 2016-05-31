Meteor.subscribe("dates");
Meteor.subscribe("locations");

Template.mainLayout.onCreated(function() {
    Session.setDefault({
        infoBoxHelp: false,
        infoBoxSubSuccess: false,
        infoBoxSubError: false,
        infoBoxUnsubSuccess: false,
        infoBoxColorClass: 'good-colour'
    });
});

//Session.set('infoBoxState', true);

Template.mainLayout.helpers({
    currentLocationClass: function() {

        var currentLocation;


        if (this._id != undefined) {
            currentLocation = Dates.find({ date_id: this._id });
            console.log(this._id);

            console.log(currentLocation);
        }
    },
    username: function() {
        return Session.get('loggedInUserDisplay');
    },
    infoBoxHelp() {
        Session.set('infoBoxColorClass', 'good-colour');

        return Session.get('infoBoxHelp');
    },
    infoBoxSubSuccess() {
        Session.set('infoBoxColorClass', 'good-colour');

        return Session.get('infoBoxSubSuccess');
    },
    infoBoxSubError() {
        Session.set('infoBoxColorClass', 'bad-colour');
        return Session.get('infoBoxSubError');
    },
    infoBoxUnsubSuccess() {
        Session.set('infoBoxColorClass', 'bad-colour');
        return Session.get('infoBoxUnsubSuccess');
    }
});
Template.mainLayout.events({
    "submit .new-player-form": function(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var prename_text = event.target.prename.value;
        var surname_text = event.target.surname.value;
        var email_text = event.target.email.value;
        var balance_input = 0;

        // Insert a user into the collection
        Meteor.call("createUser", prename_text, surname_text, email_text, balance_input);

        // Clear form
        event.target.email.value = "";
        event.target.prename.value = "";
        event.target.surname.value = "";
    },

    "click .help": function(event) {
        Session.set('infoBoxHelp', true);
    },

    "click .info-box__overlay": function(event) {
        closeInfoBox(event, 600);
    },
    "click .info-box__btn": function(event) {
        closeInfoBox(event, 600);
    }
});

var closeInfoBox = function(event, timeout) {
    classie.addClass(document.querySelector(".info-box"), 'is-removed');
    classie.addClass(document.querySelector('.info-box__overlay'), 'is-removed');

    if (timeout) {
        setTimeout(function() {
            Session.set({
                infoBoxHelp: false,
                infoBoxSubSuccess: false,
                infoBoxSubError: false,
                infoBoxUnsubSuccess: false,
            })
        }, timeout);
    } else {
        Session.set({
            infoBoxHelp: false,
            infoBoxSubSuccess: false,
            infoBoxSubError: false,
            infoBoxUnsubSuccess: false,
        })
    }

};
