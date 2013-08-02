define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/ente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var EnteView = Backbone.View.extend({

        model: Ente,

        events: {
          "touchend #ente_sx_top": "enteSxTop",
          "touchend #ente_sx_bottom": "enteSxBottom",
          "touchend #ente_dx_top": "enteDxTop",
          "touchend #ente_dx_bottom": "enteDxBottom"
        },

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        },

        enteSxTop: function () {
          var path = "sezioneEnte/chisiamo/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteSxBottom: function () {
          var path = "sezioneEnte/contatti/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteDxTop: function () {
          var path = "sezioneEnte/storia/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteDxBottom: function () {
          var path = "sezioneEnte/miglioriamo/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
      });

    return EnteView;

  });