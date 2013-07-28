define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        initialize: function() {
            this.title = "Eventi";
            this.model = Data.eventi;
          },

        render: function () {
          $(this.el).empty();
          for (var i = 0; i < this.model.length; i++) {
            $(this.el).append(new EventiListItemView({
              model: this.model.at(i)
            }).render().el);
          }
        }
      });

    return EventiListView;

  });