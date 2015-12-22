Meteor.subscribe("dates");
Meteor.subscribe("users");


Template.admin.helpers({
	currentDate: function(){
		return Dates.findOne({_id: Session.get("currentDate")});
	},
	currentUser: function(){
		return Users.findOne({_id: Session.get("currentUser")});
	},
	datestate: "Nein, leider nicht!",
	datestateClass: "no",
	isSubscripted: false,
	userbalance: "3€",
	subscribers: function(){
		// console.log(currentDate.subscribers);
		// return currentDate.subscribers;
		if(Session.get("currentDate")){
			var subscriberIds = Dates.findOne({_id: Session.get("currentDate")}).subscribers;
			return Users.find({_id: {$in: subscriberIds}});
		}
	},
	//subscribers: [{name: "Bob"}, {name: "Frank"}, {name: "Alice"}],
	dates: function() {
		return Dates.find({}, {sort: {date: 1}});
	},
	users: function() {
		return Users.find({});
	}

}); 

Template.admin.events({
	"submit .createDate": function (event) {
	// Prevent default browser form submit
	event.preventDefault();
	var location = event.target.location.value,
	year = event.target.year.value,
	month = event.target.month.value,
	day = event.target.day.value,
	hour = event.target.hour.value,
	minute = event.target.minute.value,
	date = new Date(year, month, day, hour, minute);

	// Insert a date into the collection
	Meteor.call("createDate", location, date);

	// Clear form
	event.target.location.value = "",
	event.target.year.value = "",
	event.target.month.value = "",
	event.target.day.value = "",
	event.target.hour.value = "",
	event.target.minute.value = "";
    },
    "submit .createUser": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.email.value;

      // Insert a user into the collection
      Meteor.call("createUser", text);

      // Clear form
      event.target.email.value = "";
    }
});

Template.user.events({
	"click .deleteUser": function() {
		Meteor.call("deleteUser", this._id);
	}
});

Template.date.events({
	"click .deleteDate": function() {
		Meteor.call("deleteDate", this._id);
	},
	"click .makeCurrent": function() {

		Session.set("currentDate", this._id);
	}
});
	
