define(["jquery", "underscore", "backbone", "models/Evento"],
    function ($, _, Backbone, Evento) {

    var Eventi = Backbone.Collection.extend({
        model: Evento,
        store: new WebSQLStore(db, "eventi"),

		comparator: function(evento) {
  			return evento.get("timestamp");
		},

		search: function(startDate, endDate) {
			return _(this.filter(function(data) {
		  		return data.get("timestamp") >= startDate && data.get("timestamp") <= endDate;
		  	}));
		},

    getByEnte: function(ente) {
      return _(this.filter(function(data) {
          return data.get("organizzatori").toString().indexOf(ente) != -1;
        }));
    },

    getByKeyword: function(keyword) {
      return _(this.filter(function(data) {
          return data.get("descrizione").indexOf(keyword) != -1;
        }));
    }

      });

    return Eventi;

  });