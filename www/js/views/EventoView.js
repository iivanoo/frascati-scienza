define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/ente.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EnteView = Backbone.View.extend({

        model: Evento,

        initialize: function() {
            this.title = this.model.get("titolo");
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return EnteView;

  });