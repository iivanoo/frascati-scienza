define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/sezioneente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var SezioneEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
          },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          
          var tipo = this.model.get("tipo");
          var tipoText = "";
          switch (tipo) {
            case "chisiamo":
              tipoText = "Chi siamo e per cosa lavoriamo";
              break;
            case "storia":
              tipoText = "La nostra storia";
              break;
            case "miglioriamo":
              tipoText = "Come miglioriamo la tua vita";
          }
          var context = {titolo: tipoText, testo: this.model.get(tipo).testo};
          if(this.model.get(tipo).immagine) {
            context.immagine = this.model.get(tipo).immagine;
          } else {
            if(this.model.get(tipo).video) {
              context.video = this.model.get(tipo).video;
            }
          }
          $(this.el).html(this.template(context));
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "www") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "mappa") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "aggiungiAgenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        }
      });

    return SezioneEnteView;

  });