define(["jquery", "underscore", "backbone", "models/Rss"],
    function ($, _, Backbone, Rss) {

    var RssList = Backbone.Collection.extend({
        model: Rss
      });

    return RssList;

  });