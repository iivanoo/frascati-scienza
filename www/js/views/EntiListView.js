define(["jquery", "underscore", "backbone", "collections/Enti", "views/EntiListItemView", "datamanager", "handlebars"], function($, _, Backbone, Enti, EntiListItemView, Data, Handlebars) {

  var EntiListView = Backbone.View.extend({

    model: Enti,

    className: "defaultlist_wrapper",

    initialize: function() {
      this.title = "Enti";
      this.model = Data.enti;
    },

    render: function() {
      $(this.el).empty();
      for (var i = 0; i < this.model.length; i++) {
        $(this.el).append(new EntiListItemView({
          model: this.model.at(i)
        }).render().el);
      }
      return this;
    }
  });

  return EntiListView;

});
