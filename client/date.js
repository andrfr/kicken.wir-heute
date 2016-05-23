Meteor.subscribe("dates");
Meteor.subscribe("users");
Meteor.subscribe("dates_users");

Session.set('loggedInUserDisplay', "");
Session.set('loggedInUserFullname', "");

var subSuccessTxt = function(name) {
    return '<h2>Du bist dabei, ' + name + '!</h2><button class="kokihuna layer__btn">Das wird bestimmt spaßig!</button>' 
}
var subFailedTxt = function() {
    return '<h2>Das hat was nicht funktioniert!</h2><p>Hast du vielleicht deinen Namen nicht richtig geschrieben? Bitte achte auch auf die Großbuchstaben am Anfang deines Namens!</p><button class="kokihuna layer__btn invert">Ok, ich probier es noch Mal</button>' 
}

Template.date.onRendered(function() {
    this.autorun(function() {
        if (Session.get('loggedInUserFullname') != "") {
            // User is logged in
            classie.remove(document.querySelector(".user-account"), 'is-hidden');
            classie.add(document.querySelector(".user-account"), 'is-visible');
        } else {
            // User is logged out
            classie.remove(document.querySelector(".user-account"), 'is-visible');
            classie.add(document.querySelector(".user-account"), 'is-hidden');
        }

    });
});

Template.date.helpers({

    currentUser: function() {
        return Users.findOne({
            _id: Session.get("currentUser")
        });
    },
    subscribers: function(subState) {
        //if(!this._id)
        //  return;
        //var subscriberIds = DatesUsers.find({date_id: this._id}).fetch();
        var subscribers = DatesUsers.find({
            date_id: this._id,
            state: subState
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
        return Users.find({
            _id: {
                $in: subscriberIds
            }
        });
    },
    unsubscribers: function() {
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
    datestateClass: function() {
        var subs = DatesUsers.find({
            date_id: this._id,
            state: true
        }, {
            fields: {
                'user_id': 1
            }
        }).count();
        if (subs < 6) {
            if (new Date() > this.date - 12600000) {
                return "no";
            } else {
                return "maybe";
            }
        } else {
            return "yes";
        }
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
            if (new Date() > this.date - 12600000) {
                return "Nein, leider nicht!";
            } else {
                return "Hm, noch sind wir zu wenig... meld dich doch an!";
            }
        } else {
            return "Ja, voll geil man!";
        }
    },
    isSubscripted: false,

    dates: function() {
        return Dates.find({}, {
            sort: {
                date: 1
            }
        });
    },
    users: function() {
        return Users.find({});
    },
    tooltip: function() {
        console.log('tooltip');
    }

});

Template.date.events({
    "click .unsubscribe-button": function(event, template) {
        event.preventDefault();
        var user = Session.get('loggedInUserFullname') || template.find('#subscriber-email').value;
        Meteor.call('setSubscription', this._id, user, false, function(error, result) {
            if (result) {
                Session.set('loggedInUserDisplay', result.prename);
                Session.set('loggedInUserFullname', result.fullname);
                document.getElementById('subscriber-email').disabled = true;
                document.getElementById('subscriber-email').value = result.prename + ' will leider nicht mitkicken!';
                classie.add(document.querySelector(".unsubscribe-button"), 'is-hidden');
                classie.add(document.querySelector(".subscribe-button"), 'undo');
                classie.remove(document.querySelector(".subscribe-button"), 'is-hidden');

                document.getElementsByClassName('subscribe-button-text')[0].innerHTML = 'War nur Spaß - bin dabei!';
            }
        });
    },
    "click .subscribe-button": function(event, template) {

        event.preventDefault();
        var user = Session.get('loggedInUserFullname') || template.find('#subscriber-email').value;
        Meteor.call('setSubscription', this._id, user, true, function(error, result) {
            if (result) {
                Session.set('loggedInUserDisplay', result.prename);
                Session.set('loggedInUserFullname', result.fullname);

                document.getElementById('subscriber-email').disabled = true;
                document.getElementById('subscriber-email').value = result.prename + ' ist volle Kanne dabei!';
                classie.add(document.querySelector(".unsubscribe-button"), 'undo');
                classie.remove(document.querySelector(".unsubscribe-button"), 'is-hidden');
                classie.add(document.querySelector(".subscribe-button"), 'is-hidden');

                document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Ah, mist - Oma hat Geburstag!';
                document.getElementsByClassName('layer__content')[0].innerHTML = subSuccessTxt(result.prename);
                classie.toggleClass(document.querySelector(".layer"), 'is-active');
                classie.toggleClass(document.querySelector(".overlay--blue"), 'is-active');
            }
            else {
                document.getElementsByClassName('layer__content')[0].innerHTML = subFailedTxt();
                classie.toggleClass(document.querySelector(".layer"), 'is-active');
                classie.toggleClass(document.querySelector(".overlay--red"), 'is-active');
            }
        });

    },
    "click .user-account__option--new-player": function(event, template) {
        classie.add(document.querySelector(".user-account__menu--new-player"), 'is-visible');
    },
    "click .btn__add-user": function(event, template) {
        Session.set('loggedInUserFullname', "");
        Session.set('loggedInUserDisplay', "");

        document.getElementById('subscriber-email').disabled = false;
        document.getElementById('subscriber-email').value = "";
        classie.remove(document.querySelector(".unsubscribe-button"), 'undo');
        classie.remove(document.querySelector(".unsubscribe-button"), 'is-hidden');
        classie.remove(document.querySelector(".subscribe-button"), 'undo');
        classie.remove(document.querySelector(".subscribe-button"), 'is-hidden');
        document.getElementsByClassName('unsubscribe-button-text')[0].innerHTML = 'Ohne mich!';
        document.getElementsByClassName('subscribe-button-text')[0].innerHTML = 'Ich kicke mit!';

        document.getElementById("subscriber-email").focus();
    }
});
