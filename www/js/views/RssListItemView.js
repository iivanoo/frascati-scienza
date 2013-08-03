define(["jquery", "underscore", "backbone", "models/Rss", "handlebars", "text!templates/rsslistitem.html"],
    function ($, _, Backbone, Rss, Handlebars, template) {

    var RssListItemView = Backbone.View.extend({

        model: Rss,

        tagName: "div",

        className: "row_wrapper",

        events: {
          //
        },

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var rss = this.model.toJSON();
          rss.cid = this.model.get("__id");
          $(this.el).html(this.template(rss));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        }
      });

    return RssListItemView;

  });