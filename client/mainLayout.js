Template.mainLayout.helpers({
  username: function() {
	return Session.get('loggedInUserDisplay');
  }
});
Template.mainLayout.events({
	 "submit .new-player-form": function (event) {
		 // Prevent default browser form submit
        event.preventDefault();
    	console.log('hiih');

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