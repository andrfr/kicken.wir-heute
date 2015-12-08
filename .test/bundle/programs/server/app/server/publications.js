(function(){// Meteor.publish definitions
Meteor.publish("dates", function () {
    return Dates.find({});
});
Meteor.publish("users", function () {
    return Users.find({});
});
}).call(this);

//# sourceMappingURL=publications.js.map
