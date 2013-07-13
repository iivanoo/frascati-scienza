define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var Ente = Backbone.Model.extend("Ente", {
    defaults: {
      nome: undefined,
    }
  });

  return Ente;

});
