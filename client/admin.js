Meteor.subscribe("dates");
Meteor.subscribe("users");
Meteor.subscribe("dates_users");

Template.admin.helpers({
    currentDate: function() {
        return Dates.findOne({ _id: Session.get("currentDate") });
    },
    currentUser: function() {
        return Users.findOne({ _id: Session.get("currentUser") });
    },
    datestate: "Nein, leider nicht!",
    isSubscripted: false,
    subscribers: function() {
        // console.log(currentDate.subscribers);
        // return currentDate.subscribers;
        if (Session.get("currentDate")) {
            var subscriberIds = Dates.findOne({ _id: Session.get("currentDate") }).subscribers;
            return Users.find({ _id: { $in: subscriberIds } });
        }
    },
    dates: function() {
        return Dates.find({}, { sort: { date: 1 } });
    },
    users: function() {
        return Users.find({});
    }

});

Template.admin.events({
    "submit .createDate": function(event) {
        // Prevent default browser form submit
        event.preventDefault();
        var location = event.target.location.value,
            //year = event.target.year.value,
            //month = event.target.month.value - 1,
            //day = event.target.day.value,
            //hour = event.target.hour.value,
            //minute = event.target.minute.value,
            //date = new Date(year, month, day, hour, minute);

            //time = new Date(event.target.time.value),
            //date = new Date(event.target.date.value);
            date = new Date(event.target.date.value + " " + event.target.time.value);

        //date.setHours(time.getHours());
        //date.setMinutes(time.getMinutes());

        // Insert a date into the collection
        Meteor.call("createDate", location, date);

        // Clear form
        event.target.location.value = "";
        //event.target.year.value = "",
        //event.target.month.value = "",
        //event.target.day.value = "",
        //event.target.hour.value = "",
        //event.target.minute.value = "";
    },
    "submit .createUser": function(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var prename_text = event.target.prename.value;
        var surname_text = event.target.surname.value;
        var email_text = event.target.email.value;
        var balance_input = event.target.balance.value;

        // Insert a user into the collection
        Meteor.call("createUser", prename_text, surname_text, email_text, balance_input);

        // Clear form
        event.target.email.value = "";
        event.target.prename.value = "";
        event.target.surname.value = "";
        event.target.balance.value = "";
    }
});

Template.admin.onRendered(function() {
    $('.datepicker').pickadate();
    $('.timepicker').pickatime();
});

Template.userListElement.events({
    "click .deleteUser": function() {
        Meteor.call("deleteUser", this._id);
    },
    "click .sendEmail": function() {
        Meteor.call("sendEmail",
            'samuel.lutzweiler@posteo.de',
            'kicken@wir-heute.de',
            'Testmail',
            'Mann das klappt ja gut!');
        console.log('bin schon mal in der richtigen Funktion');
    },
    
    //Edit user
    "click .userlist__edit-user": function(event) {

        //Find User in List and delete inner HTML and replace with editable inputfields with user data


        //update user and replace inputs with static text
    },

    "focusout .edit-prename": function(event) {
    	Meteor.call("editUserPrename", this._id, event.target.value)
    },

    "focusout .edit-surname": function(event) {
    	Meteor.call("editUserSurname", this._id, event.target.value)
    },

    "focusout .edit-email": function(event) {
    	Meteor.call("editUserEmail", this._id, event.target.value)
    },

     "focusout .edit-balance": function(event) {
    	Meteor.call("editUserBalance", this._id, event.target.value)
    }

});

Template.dateListElement.events({
    "click .deleteDate": function() {
        Meteor.call("deleteDate", this._id);
    },
    "click .makeCurrent": function() {

        Session.set("currentDate", this._id);
    }
});
