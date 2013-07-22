define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/entilistitem.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EntiListItemView = Backbone.View.extend({

        model: Evento,

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