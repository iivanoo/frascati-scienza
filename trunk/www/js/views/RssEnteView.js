define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/rssente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var RssEnteView = Backbone.View.extend({

        model: Ente,

        initialize: function() {
            this.title = model.get("titolo");
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return RssEnteView;

  });