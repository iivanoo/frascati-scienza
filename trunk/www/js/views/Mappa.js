define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/ente.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EnteView = Backbone.View.extend({

        // come model qui bisogna passargli l'evento, l'ente o lo sponsor

        initialize: function() {
            if(model.has("titolo")) {
              this.title = model.get("titolo");
            }
            if(model.has("nome")) {
              this.title = model.get("nome");
            }
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return EnteView;

  });