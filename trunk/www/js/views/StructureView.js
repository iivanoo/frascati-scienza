define(["jquery", "underscore", "backbone", "handlebars", "text!templates/structure.html"],
    function ($, _, Backbone, Handlebars, template) {

    var StructureView = Backbone.View.extend({

        id: "mainContainer", 

        events: {
          "touchend #backbutton": "goBack",
          "touchend #frascatiscienza #frascatiscienzaInactive": "frascatiscienza",
          "touchend #eventi #eventiInactive": "eventi",
          "touchend #caccia #cacciaInactive": "caccia",
          "touchend #agenda #agendaInactive": "agenda",
        },

        initialize: function() {
          this.on("updateTitle", this.updateTitle);
        },

        goBack: function () {
          window.history.back();
        },

        updateTitle: function (page) {
          document.getElementById("title").innerHTML = page.title;
        },

        template: Handlebars.compile(template),

        render: function () {
          this.title = "Test";
          $(this.el).html(this.template({}));
          $('body').append($(this.el));
          return this;
        },

        frascatiscienza: function(event) {
          Backbone.history.navigate("frascatiscienza", {trigger: true});
        },
        eventi: function(event) {
          Backbone.history.navigate("eventi", {trigger: true});
        },
        caccia: function(event) {
          Backbone.history.navigate("caccia", {trigger: true});
        },
        agenda: function(event) {
          Backbone.history.navigate("agenda", {trigger: true});
        }
      });

    return StructureView;

  }); 