define(["jquery", "underscore", "backbone", "handlebars", "text!templates/frascatiscienza.html"],
    function ($, _, Backbone, Handlebars, template) {

    var FrascatiScienzaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Frascati Scienza";
          },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return FrascatiScienzaView;

  });