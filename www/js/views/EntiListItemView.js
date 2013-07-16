define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/entilistitem.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var EntiListItemView = Backbone.View.extend({

        model: Ente,

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return EntiListItemView;

  });