define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/entilistitem.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var EntiListItemView = Backbone.View.extend({

        model: Ente,

        tagName: "div",

        className: "row_wrapper",

        events: {
          "touchend": "goToEnte"
        },

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var ente = this.model.toJSON();
          ente.cid = this.model.get("__id");
          $(this.el).html(this.template(ente));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        },

        goToEnte: function() {
          var path = "enti/" + this.model.cid;
          Backbone.history.navigate(path, {trigger: true});
        }
      });

    return EntiListItemView;

  });