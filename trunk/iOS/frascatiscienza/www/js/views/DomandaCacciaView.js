define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "text!templates/domandacaccia.html"],
    function ($, _, Backbone, Handlebars, Tappa, template) {

    var RisultatoCacciaView = Backbone.View.extend({

        model: Tappa,

        events: {
          "touchend .risposta": "domandaPressed",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = this.model.get("titolo");
            this.moving = false; 
        },

        touchMove: function() {
          this.moving = true;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          //this.updateNavbar();

          $(this.el).html(this.template(this.model.toJSON()));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
/*          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "caccia") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "cacciaInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }*/
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        },

        domandaPressed: function (e) {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var idDomanda = e.currentTarget.id.charAt(e.currentTarget.id.length - 1);
          if(idDomanda == this.model.get("rispostacorretta")) {
            // TODO gestire domanda corretta
            console.log("ok");
          } else {
            // TODO gestire domanda sbagliata
            console.log("no");
          }
          Backbone.history.navigate("risultatocaccia/" + this.model.id, {trigger: true});
        }
      });

    return RisultatoCacciaView;

  });