(function(){Meteor.methods({
  setSubscription: function(dateId, email, subState) {
    var userId = Users.findOne({email: email})._id;
    console.log(userId);
    var subscribers = Dates.findOne({_id: dateId}, {fields: {subscribers: 1}}).subscribers;
    console.log(subscribers.indexOf(userId));
    if (subscribers.indexOf(userId) === -1 && subState) {
      Dates.update({_id: dateId}, {$push: {subscribers: userId}});
    } else if (! subState){
      Dates.update({_id: dateId}, {$pull: {subscribers: userId}});
    }

  },
  createDate: function(dateInfo) {
    Dates.insert({
      dateInfo: dateInfo,
      subscribers: []
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
}).call(this);

//# sourceMappingURL=methods.js.map
