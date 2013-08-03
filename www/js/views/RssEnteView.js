define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/rssente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var RssEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));

          // var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");

          return this;
        }
      });

    return RssEnteView;

  });