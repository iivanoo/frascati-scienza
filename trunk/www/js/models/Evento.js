define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var Evento = Backbone.Model.extend("Evento", {
    defaults: {
      nome: undefined,
    }
  });

  return Evento;

});
