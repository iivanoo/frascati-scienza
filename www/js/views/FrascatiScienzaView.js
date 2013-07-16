define(["jquery", "underscore", "backbone", "handlebars", "text!templates/frascatiscienza.html"],
    function ($, _, Backbone, Handlebars, template) {

    var FrascatiScienzaView = Backbone.View.extend({

      events: {
          "touchend #enti": "enti",
          "touchend #sponsor": "sponsor"
      },

      initialize: function() {
        this.title = "Frascati Scienza";
      },

      template: Handlebars.compile(template),

      render: function () {
        $(this.el).html(this.template({}));
        return this;
      },

      enti: function(event) {
        Backbone.history.navigate("enti", {trigger: true});
      },

      sponsor: function(event) {
        Backbone.history.navigate("sponsor", {trigger: true});
      },
    });

    return FrascatiScienzaView;

  });