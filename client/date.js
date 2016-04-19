Meteor.subscribe("dates");
Meteor.subscribe("users");
Meteor.subscribe("dates_users");

Session.set('loggedInUser', "");

Template.date.onRendered(function() {
  this.autorun(function() {
	if(Session.get('loggedInUser') != "") {
	  // User is logged in
	  classie.remove(document.querySelector(".user-account"), 'is-hidden');
	  classie.add(document.querySelector(".user-account"), 'is-visible');
	  classie.remove(document.querySelector(".add-subscriber"), 'is-hidden');
	} else {
	  // User is logged out
	  classie.remove(document.querySelector(".user-account"), 'is-visible');
	  classie.add(document.querySelector(".user-account"), 'is-hidden');
	  classie.add(document.querySelector(".add-subscriber"), 'is-hidden');
	}
  });
});

Template.date.helpers({
	currentUser: function() {
		return Users.findOne({
			_id: Session.get("currentUser")
		});
	},
	subscribers: function() {
		//if(!this._id)
		//	return;
		//var subscriberIds = DatesUsers.find({date_id: this._id}).fetch();
		var subscribers = DatesUsers.find({
			date_id: this._id,
			state: true
		}, {
			fields: {
				'user_id': 1
			}
		}).fetch();
		var subscriberIds = [];
		for (var i = 0; i <= subscribers.length; i++) {
			if (subscribers[i])
				subscriberIds.push(subscribers[i]['user_id']);
		}
		console.log(subscriberIds);
		//return [];
		return Users.find({
			_id: {
				$in: subscriberIds
			}
		});
	},
	numSubscribers: function(subState) {
		return DatesUsers.find({
			date_id: this._id,
			state: subState
		}, {
			fields: {
			'user_id': 1
		}
		}).count();
		//console.log("numSubs" + countSubscribers(subState));
		//return countSubscribers(subState);
	},
	datestate: function() {
		var subs = DatesUsers.find({
			date_id: this._id,
			state: true
		}, {
			fields: {
			'user_id': 1
		}
		}).count();
		if (subs < 6) {
			if (new Date() > this.date - 3600000) {
				return	"Nein, leider nicht!";
			} else {
				return "Vielleicht";
			}
		} else {
			return "Jawoll";
		}
	},
	datestateClass: "no",
	isSubscripted: false,
	userbalance: "3€",
	dates: function() {
		return Dates.find({}, {
			sort: {
				date: 1
			}
		});
	},
	users: function() {
		return Users.find({});
	}
});

Template.date.events({
    "click .unsubscribe-button": function(event, template) {
        event.preventDefault();
		var user = Session.get('loggedInUser') || template.find('#subscriber-email').value;
        Meteor.call('setSubscription', this._id, user, false, function(error, result) {
            if (result) {
				Session.set('loggedInUser', user);
                
                document.getElementById('subscriber-email').disabled = true;
                document.getElementById('subscriber-email').value = user + ' will leider nicht mitkicken!';
                classie.add(document.querySelector(".unsubscribe-button"), 'is-hidden');
                classie.add(document.querySelector(".subscribe-button"), 'undo');
                classie.remove(document.querySelector(".subscribe-button"), 'is-hidden');

                document.getElementsByClassName('subscribe-button-text')[0].innerHTML = 'Oder, ne, doch!';
            }
        });
    },
    "click .subscribe-button": function(event, template) {
        event.preventDefault();
		var user = Session.get('loggedInUser') || template.find('#subscriber-email').value;
        Meteor.call('setSubscription', this._id, user, true, function(error, result) {
            if (result) {
				Session.set('loggedInUser', user); 
            	
            	//console.log(Users.findOne({_id: Session.get("currentUser")}).email);
                
                document.getElementById('subscriber-email').disabled = true;
                document.getElementById('subscriber-email').value = user + ' ist volle Kanne dabei!';
                classie.add(document.querySelector(".unsubscribe-button"), 'undo');
                classie.remove(document.querySelector(".unsubscribe-button"), 'is-hidden');
                classie.add(document.querySelector(".subscribe-button"), 'is-hidden');

                document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Halt, ne doch nicht!';
            }
        });

    },
    "click .user-account__option--new-player": function(event, template) {
        classie.add(document.querySelector(".user-account__menu--new-player"), 'is-visible');
    },
	"click .add-subscriber a": function(event, template) {
	  Session.set('loggedInUser', "");

	  document.getElementById('subscriber-email').disabled = false;
	  document.getElementById('subscriber-email').value = "";
      classie.remove(document.querySelector(".unsubscribe-button"), 'undo');
      classie.remove(document.querySelector(".unsubscribe-button"), 'is-hidden');
      classie.remove(document.querySelector(".subscribe-button"), 'undo');
      classie.remove(document.querySelector(".subscribe-button"), 'is-hidden');
	  document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Ohne mich!';
	  document.getElementsByClassName('subscribe-button-text')[0].innerHTML = 'Ich kicke mit!';
	}
});
