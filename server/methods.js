Meteor.methods({
    setSubscription: function(dateId, inputText, subState) {
        var user = Users.findOne({ $or: [{ fullname: inputText }, { email: inputText }] });

        if (user) {
            DatesUsers.update({ date_id: dateId, user_id: user._id }, { date_id: dateId, user_id: user._id, state: subState }, { upsert: true });

            return user;
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
            date: date,
        });
    },
    createUser: function(prename, surname, email, balance) {
        Users.insert({
            prename: prename,
            surname: surname,
            fullname: prename + " " + surname,
            email: email,
            balance: balance
        });
    },
    deleteUser: function(userId) {
        Users.remove(userId);
        DatesUsers.remove({ user_id: userId });
    },
    deleteDate: function(dateId) {
        Dates.remove(dateId);
    },
    getUser: function(username) {
        var user = User.findOne({ fullname: username });
        if (username) {

            return user
        } else {
            return false;
        }
    },
    editUser: function(userId) {

    }
});
