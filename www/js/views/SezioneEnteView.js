define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/sezioneente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var SezioneEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = "Frascati Scienza";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return SezioneEnteView;

  });