Template.registerHelper('formatDate', function(date) {
	return moment(date).format('[am] Do MMMM YYYY [um] h:mm');
});
