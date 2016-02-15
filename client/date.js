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
	},
	datestate: "Nein, leider nicht!",
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
				document.getElementById('subscriber-email').style = 'background: #ddd; color: white;';
				document.getElementsByClassName('unsubscribe-button')[0].style = 'display: none';
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
				document.getElementById('subscriber-email').style = 'background: #ddd; color: white;';
				document.getElementsByClassName('subscribe-button')[0].style = 'display: none';
				document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Halt,ne doch nicht!';
			}
		});

	},
	"click .user-account__option--add-player": function(event, template) {
		classie.add(document.querySelector(".user-account__menu--add-player"), 'is-visible');
	}
});
