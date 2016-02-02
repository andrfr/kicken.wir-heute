Router.configure({
	layoutTemplate: 'main'
});
Router.route('/', function() {
	var dates = Dates.find({}, {sort: {date: 1}}).fetch(),
	today = new Date(),
	currentDate;
	currentDate = dates[0];
	//find nearest upcoming date
	for (var i = 0; i <= dates.length; i++) {
		if (dates[i].date >= today) {
			currentDate = dates[i];
			break;
		}
	}

	if (!currentDate) {
		this.redirect('/nope');
	} else {
		this.redirect('/date/' + currentDate._id);
	}
});
Router.route('/date/:_id', {
	template: 'date',
	data: function() {
		//var dateSubscribers = Users.find({_id: {$in: currentDate.subscribers}});
		//currentDate.subscribers = dateSubscribers;
		return Dates.findOne({_id: this.params._id});	
	}
});
Router.route('admin');
Router.route('nope');
