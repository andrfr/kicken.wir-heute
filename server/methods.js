Meteor.methods({
	setSubscription: function(dateId, email, subState) {
		var userId = Users.findOne({email: email})._id;
		//var subscribers = Dates.findOne({_id: dateId}, {fields: {subscribers: 1}}).subscribers;
		//console.log(subscribers.indexOf(userId));
		if (subState) {
			DatesUsers.update({date_id: dateId, user_id: userId}, {date_id: dateId, user_id: userId}, {upsert: true});
		} else {
			DatesUsers.remove({date_id: dateId, user_id: userId});
		}

	},
	createDate: function(location, date) {
		Dates.insert({
			location: location,
			date:date,
		});
	},
	createUser: function(email) {
		Users.insert({
		email: email
	});
	},
	deleteUser: function (userId) {
	    Users.remove(userId);
	  },
	  deleteDate: function (dateId) {
	    Dates.remove(dateId);
	  }
});
