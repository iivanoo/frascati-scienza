define(["jquery", "underscore", "backbone", "models/TappaPercorso"],
    function ($, _, Backbone, TappaPercorso) {

    var TappePercorsi = Backbone.Collection.extend({
        model: TappaPercorso,
        store: new WebSQLStore(db, "tappe_percorsi")
      });

    return TappePercorsi;

  });