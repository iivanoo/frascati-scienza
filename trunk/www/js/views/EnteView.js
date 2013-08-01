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

        initialize: function() {
            this.title = this.model.get("titolo");
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        },

        enteSxTop: function () {
          var path = "sezioneEnte/chisiamo/" + this.model.cid;
          Backbone.history.navigate(path, {trigger: true});
        }
      });

    return EnteView;

  });