define(["jquery", "underscore", "backbone", "models/Evento"],
    function ($, _, Backbone, Evento) {

    var Eventi = Backbone.Collection.extend({
        model: Evento,
        store: new WebSQLStore(db, "eventi")
      });

    return Eventi;

  });