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
          "touchend #mappa": "showMappa",
          "touchend #ricerca": "ricerca",
          "touchend #eventi_ente_butt": "showEventi"
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
          Backbone.history.navigate("intronotte", {trigger: true});
        },

        caccia: function(event) {
            // navigator.notification.alert('La caccia al tesoro sarà disponibile a breve!', function() {}, "Coming soon");
            Backbone.history.navigate("caccia", {trigger: true});
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
          if(navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('Questa funzionalità ha bisogno di una connessione ad Internet. Sembra che non sei connesso ad Internet, potresti riprovare più tardi?', function() {}, "Problema di connessione");
            return;
          }
          window.open(this.currentView.model.get("sito"), '_blank', 'location=yes,closebuttoncaption=chiudi');
        },

        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },

        showEventi: function(event) {
          this.currentView.eventi();
        },

        ricerca: function(event) {
          navigator.notification.prompt("Cerca negli eventi", function(results) {
            if(results.buttonIndex == 1) {
              if(!results.input1 || results.input1 == "Visite...") {
                Backbone.history.navigate("eventi", {trigger: true});
              } else {
                Backbone.history.navigate("eventiCerca/" + results.input1.strip(), {trigger: true});
              }
            }
          }, "Cerca", ["OK","Annulla"], "Visite...")
        }
      });

    return StructureView;

  }); 