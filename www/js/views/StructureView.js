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


          scanner = cordova.require("cordova/plugin/BarcodeScanner");
          scanner.scan(
                function (result) {
                    console.log("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
                );

          // if(navigator.connection.type == Connection.NONE) {
          //   navigator.notification.alert('Questa funzionalità ha bisogno di una connessione ad Internet. Sembra che non sei connesso ad Internet, potresti riprovare più tardi?', function() {}, "Problema di connessione");
          //   return;
          // }
          // window.open(this.currentView.model.get("sito"), '_blank', 'location=yes,closebuttoncaption=chiudi,EnableViewPortScale=yes');
        },

        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },

        showEventi: function(event) {
          this.currentView.eventi();
        },

        ricerca: function(event) {
          Backbone.history.navigate("cerca", {trigger: true});
        }
      });

    return StructureView;

  }); 