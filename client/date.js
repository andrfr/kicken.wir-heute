Meteor.subscribe("dates");
Meteor.subscribe("users");
Meteor.subscribe("dates_users");


Template.date.helpers({
    //currentDate: function(){
    //	return Dates.findOne({_id: Session.get("currentDate")});
    //},
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
            date_id: this._id
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
    numSubscribers: function() {
        return DatesUsers.find({
            date_id: this._id
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
    //subscriberNames: function(){
    // console.log(currentDate.subscribers);
    // return currentDate.subscribers;
    //if(this._id){
    //var subscriberIds = Dates.findOne({_id: this._id}).subscribers;
    //		return Users.find({_id: {$in: this.subscribers}});
    //}
    //},
    //subscribers: [{name: "Bob"}, {name: "Frank"}, {name: "Alice"}],
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
            classie.remove(document.querySelector(".user-account"), 'is-visible');
            classie.add(document.querySelector(".user-account"), 'is-hidden');
        });
    },
    "click .subscribe-button": function(event, template) {
        event.preventDefault();
        console.log('template: ' + template.find('#subscriber-email').value);

        Meteor.call('setSubscription', this._id, template.find('#subscriber-email').value, true, function(error, result) {
            classie.remove(document.querySelector(".user-account"), 'is-hidden');
            classie.add(document.querySelector(".user-account"), 'is-visible');
            console.log("result:" + result);
        });

    },
});
