define(["jquery", "underscore", "backbone", "handlebars", "text!templates/legenda.html"],
    function ($, _, Backbone, Handlebars, template) {

    var LegendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Legenda";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return LegendaView;

  });