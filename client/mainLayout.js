Meteor.subscribe("dates");
Meteor.subscribe("locations");

Template.mainLayout.helpers({
    currentLocationClass: function() {
    	
        var currentLocation = Dates.findOne({ date_id: this._id });

        console.log(this._id);

        if(this._id != undefined)
        	console.log("undefinded");
     

    },
    username: function() {
        return Session.get('loggedInUserDisplay');
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
    }
});
