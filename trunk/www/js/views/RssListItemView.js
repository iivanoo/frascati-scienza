define(["jquery", "underscore", "backbone", "models/Rss", "handlebars", "text!templates/rsslistitem.html"],
    function ($, _, Backbone, Rss, Handlebars, template) {

    var RssListItemView = Backbone.View.extend({

        model: Rss,

        tagName: "div",

        className: "row_wrapper",

        events: {
          "touchend .row_wrapper": "openUrl"
        },

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var rss = this.model.toJSON();
          $(this.el).html(this.template(rss));
          return this;
        },

        openUrl: function (event) {
          window.open(this.model.get("link"), '_blank', 'location=yes,closebuttoncaption=chiudi');
        }
      });

    return RssListItemView;

  });