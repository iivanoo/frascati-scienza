define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/evento.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EnteView = Backbone.View.extend({

        model: Evento,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
        },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
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

    return EnteView;

  });