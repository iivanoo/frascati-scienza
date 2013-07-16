define(["jquery", "underscore", "backbone", "handlebars", "text!templates/agenda.html"],
    function ($, _, Backbone, Handlebars, template) {

    var AgendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Agenda Personale";
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return AgendaView;

  });