define(["jquery", "underscore", "backbone", "models/Percorso"],
    function ($, _, Backbone, Percorso) {

    var Percorsi = Backbone.Collection.extend({
        model: Percorso,
        store: new WebSQLStore(db, "percorsi")
      });

    return Percorsi;

  });