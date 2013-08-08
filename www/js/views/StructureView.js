define(["jquery", "underscore", "backbone", "handlebars", "text!templates/structure.html"],
    function ($, _, Backbone, Handlebars, template) {

    var StructureView = Backbone.View.extend({

        id: "mainContainer", 

        events: {
          "touchend #backbutton": "goBack",
          "touchend #frascatiscienza": "frascatiscienza",
          "touchend #eventi": "eventi",
          "touchend #caccia": "caccia",
          "touchend #agenda": "agenda",
          "touchend #frascatiscienzaInactive": "frascatiscienza",
          "touchend #eventiInactive": "eventi",
          "touchend #cacciaInactive": "caccia",
          "touchend #agendaInactive": "agenda",
          "touchend #legenda": "legenda",
          "touchend #aggiungiAgenda": "addAgenda",
          "touchend #www": "showSito",
          "touchend #mappa": "showMappa"
        },

        initialize: function() {
          this.on("updateTitle", this.updateTitle);
          this.currentView = undefined;
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
          $('#content').css({
            'height': $(window).height() - 88
          });
          return this;
        },

        frascatiscienza: function(event) {
          Backbone.history.navigate("frascatiscienza", {trigger: true});
        },
        eventi: function(event) {
          Backbone.history.navigate("eventi", {trigger: true});
        },

        caccia: function(event) {
            navigator.notification.alert('La caccia al tesoro sarà disponibile a breve!', function() {}, "");
            // Backbone.history.navigate("caccia", {trigger: true});
        },
        
        agenda: function(event) {
          Backbone.history.navigate("agenda", {trigger: true});
        },

        legenda: function(event) {
          Backbone.history.navigate("legenda", {trigger: true});
        },

        addAgenda: function(event) {
          this.currentView.addAgenda(event);
        },
        showSito: function(event) {
          window.open(this.currentView.model.get("sito"), '_blank', 'location=yes,closebuttoncaption=chiudi');
        },
        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },
      });

    return StructureView;

  }); 