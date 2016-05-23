// Meteor.publish definitions
Meteor.publish("dates", function () {
    return Dates.find({});
});
Meteor.publish("dates_users", function () {
    return DatesUsers.find({});
});
Meteor.publish("users", function () {
    return Users.find({});
});
Meteor.publish("locations", function() {
	return Locations.find({});
});