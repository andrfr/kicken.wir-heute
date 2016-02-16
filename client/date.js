Meteor.subscribe("dates");
Meteor.subscribe("users");
Meteor.subscribe("dates_users");


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
				return "Möglicherscheiße";
			}
		} else {
			return "Jawöllchen";
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
		Meteor.call('setSubscription', this._id, template.find('#subscriber-email').value, false, function(error, result) {
			if (result) {
				classie.remove(document.querySelector(".user-account"), 'is-visible');
				classie.add(document.querySelector(".user-account"), 'is-hidden');

				document.getElementById('subscriber-email').disabled = true;
				classie.add(document.querySelector(".unsubscribe-button"), 'is-hidden');
				classie.add(document.querySelector(".subscribe-button"), 'undo');

				document.getElementsByClassName('subscribe-button-text')[0].innerHTML = 'Oder, ne, doch!';
			}
		});
	},
	"click .subscribe-button": function(event, template) {
		event.preventDefault();

		Meteor.call('setSubscription', this._id, template.find('#subscriber-email').value, true, function(error, result) {
			if (result) {
				classie.remove(document.querySelector(".user-account"), 'is-hidden');
				classie.add(document.querySelector(".user-account"), 'is-visible');

				document.getElementById('subscriber-email').disabled = true;
				classie.add(document.querySelector(".unsubscribe-button"), 'undo');
				classie.add(document.querySelector(".subscribe-button"), 'is-hidden');

				document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Halt, ne doch nicht!';
			}
		});

	},
	"click .user-account__option--new-player": function(event, template) {
		classie.add(document.querySelector(".user-account__menu--new-player"), 'is-visible');
	}
});
