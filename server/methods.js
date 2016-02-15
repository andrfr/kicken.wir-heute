Meteor.methods({
	setSubscription: function(dateId, email, subState) {
		var user = Users.findOne({email: email});
		if (user) {
			DatesUsers.update({date_id: dateId, user_id: user._id}, {date_id: dateId, user_id: user._id, state:subState}, {upsert: true});
			return true;
		} else {
			return false;
		}
		//} else {
		//	DatesUsers.remove({date_id: dateId, user_id: userId});
		//}

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
