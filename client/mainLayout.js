Template.mainLayout.helpers({
  username: function() {
	return Session.get('loggedInUserDisplay');
  }
});
