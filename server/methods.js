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
        //  DatesUsers.remove({date_id: dateId, user_id: userId});
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
            balance: balance,
            receiveEmail: true
        });
    },
    deleteUser: function(userId) {
        Users.remove(userId);
        DatesUsers.remove({ user_id: userId });
    },
    deleteDate: function(dateId) {
        Dates.remove(dateId);
    },
    editUserPrename: function(userId, inputText) {
        var user = Users.findOne({ _id: userId });

        Users.update({ _id: userId }, { $set: { prename: inputText } });
    },
    editUserSurname: function(userId, inputText) {
        var user = Users.findOne({ _id: userId });

        Users.update({ _id: userId }, { $set: { surname: inputText } });
    },
    editUserEmail: function(userId, inputText) {
        var user = Users.findOne({ _id: userId });

        Users.update({ _id: userId }, { $set: { email: inputText } });
    },
    editUserBalance: function(userId, inputText) {
        var user = Users.findOne({ _id: userId });

        Users.update({ _id: userId }, { $set: { balance: inputText } });
    },
    sendEmail: function(to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    },
    editEmailSubscription: function(userId, checked) {
        var user = Users.findOne({ _id: userId});
        Users.update({ _id: userId }, { $set: { receiveEmail: checked } });
    }
});
