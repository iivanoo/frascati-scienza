define(["jquery", "underscore", "backbone", "handlebars", "text!templates/nottericercatori.html"],
    function ($, _, Backbone, Handlebars, template) {

    var NotteRicercatoriView = Backbone.View.extend({

        initialize: function() {
            this.title = "Notte dei Ricercatori";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return NotteRicercatoriView;

  });