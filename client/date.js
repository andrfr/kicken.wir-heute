Meteor.subscribe("dates");
Meteor.subscribe("users");


Template.date.helpers({
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

Template.date.events({
	"click .unsubscribe-button": function (event, template) {
		event.preventDefault();

    	Meteor.call('setSubscription', Session.get("currentDate"), template.find('#subscriber-email').value, false, function (error, result) {
    		// console.log("result:" + result);
    		classie.remove(document.querySelector(".user-account"), 'is-visible');
    		classie.add(document.querySelector(".user-account"), 'is-hidden');
    	});
	},
	"click .subscribe-button": function (event, template) {
		event.preventDefault();

    	Meteor.call('setSubscription', Session.get("currentDate"), template.find('#subscriber-email').value, true, function (error, result) {
    		classie.remove(document.querySelector(".user-account"), 'is-hidden');
    		classie.add(document.querySelector(".user-account"), 'is-visible');
    		// console.log("result:" + result);
    	});

    }
    "click .user-account__option--add-player": function (event, template) {
    	classie.add(document.querySelector(".user-account__menu--add-player"), 'is-visible');	
    }
});
