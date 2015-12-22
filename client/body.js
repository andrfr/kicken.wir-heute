Meteor.subscribe("dates");
Meteor.subscribe("users");


Template.body.helpers({
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

Template.body.events({
	"click .unsubscribe-button": function (event, template) {
		event.preventDefault();

    	Meteor.call('setSubscription', Session.get("currentDate"), template.find('#subscriber-email').value, false, function (error, result) {
    		// console.log("result:" + result);
    		classie.remove(document.querySelector("#user-account"), 'is-visible');
    		classie.add(document.querySelector("#user-account"), 'is-hidden');
    	});
	},
	"click .subscribe-button": function (event, template) {
		event.preventDefault();

    	Meteor.call('setSubscription', Session.get("currentDate"), template.find('#subscriber-email').value, true, function (error, result) {
    		classie.remove(document.querySelector("#user-account"), 'is-hidden');
    		classie.add(document.querySelector("#user-account"), 'is-visible');
    		// console.log("result:" + result);
    	});

    },
	"submit .createDate": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.date.value;

      // Insert a task into the collection
      Meteor.call("createDate", text);

      // Clear form
      event.target.date.value = "";
    },
    "submit .createUser": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.email.value;

      // Insert a task into the collection
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
