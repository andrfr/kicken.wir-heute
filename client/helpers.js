Template.registerHelper('formatDate', function(date) {
	return moment(date).format('[am] Do MMMM YYYY [um] LT');
});

Template.registerHelper('infoBoxColorClass', function() {
	return Session.get('infoBoxColorClass');
});

Template.registerHelper('animationState', function(state) {
	if (state){
		return 'is-removed';
	}
});

