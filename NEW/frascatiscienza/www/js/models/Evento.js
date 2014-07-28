define(["jquery", "underscore", "models/EnteEvento", "backbone"], function($, _, EnteEvento, Backbone) {
  var Evento = EnteEvento.extend("Evento", {
    defaults: {
      titolo: undefined,
    },

    ciao: function() {
    	alert();
    	return true;
    }
  });

  return Evento;

});
