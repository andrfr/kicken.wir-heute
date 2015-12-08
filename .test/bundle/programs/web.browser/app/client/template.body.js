(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.DIV({
    id: "date"
  }, "\n        ", HTML.H1("Kicken wir ", Blaze.View("lookup:currentDate.dateInfo", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentDate"), "dateInfo"));
  }), "?"), "\n        ", HTML.P(Blaze.View("lookup:datestate", function() {
    return Spacebars.mustache(view.lookup("datestate"));
  })), "\n        ", HTML.DIV({
    id: "date-info"
  }, "\n        	", HTML.Raw("<p>Bis jetzt nur:</p>"), "\n        	", HTML.UL({
    id: "subscriber"
  }, "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("subscribers"));
  }, function() {
    return [ " ", HTML.LI(Blaze.View("lookup:email", function() {
      return Spacebars.mustache(view.lookup("email"));
    })), " " ];
  }), "\n        	"), "\n            ", HTML.Raw("<p>Bist du dabei?</p>"), "\n            ", HTML.Raw('<form class="subscribeToDate">\n                <input type="text" name="subscriberEmail" class="subscriberEmail" placeholder="email">\n                <button class="subscribe">Ich kicke mit!</button>\n                <button class="unsubscribe">Ohne mich!</button>\n            </form>'), "\n        	\n        "), "\n    "), HTML.Raw("\n<hr>\n    "), HTML.DIV({
    id: "meta"
  }, "\n    	", HTML.P("Hallo ", Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  })), "\n    	", HTML.P("Dein Kontostand: ", Blaze.View("lookup:userbalance", function() {
    return Spacebars.mustache(view.lookup("userbalance"));
  })), "\n        ", HTML.Raw("<p>Alle Termine: </p>"), "\n        ", HTML.UL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("dates"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("date")), "\n        " ];
  }), "\n        "), "\n        ", HTML.Raw("<p>Termin erstellen</p>"), "\n        ", HTML.Raw('<form class="createDate">\n          <input type="text" name="date" placeholder="date">\n        </form>'), "\n        ", HTML.Raw("<p>Alle User: </p>"), "\n        ", HTML.UL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("users"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("user")), "\n            \n        " ];
  }), "\n        "), "\n        ", HTML.Raw("<p>User erstellen</p>"), "\n        ", HTML.Raw('<form class="createUser">\n          <input type="text" name="email" placeholder="email">\n        </form>'), "\n    ") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("date");
Template["date"] = new Template("Template.date", (function() {
  var view = this;
  return HTML.LI(Blaze.View("lookup:dateInfo", function() {
    return Spacebars.mustache(view.lookup("dateInfo"));
  }), HTML.Raw(' <button class="makeCurrent">aktuell</button> <button class="deleteDate">&times;</button>'));
}));

Template.__checkName("user");
Template["user"] = new Template("Template.user", (function() {
  var view = this;
  return HTML.LI(Blaze.View("lookup:email", function() {
    return Spacebars.mustache(view.lookup("email"));
  }), HTML.Raw(' <button class="deleteUser">&times;</button>'));
}));

}).call(this);
