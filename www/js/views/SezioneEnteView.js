define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/sezioneenteview.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var SezioneEnteView = Backbone.View.extend({

        model: Ente,

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