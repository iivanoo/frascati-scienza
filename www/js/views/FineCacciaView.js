define(["jquery", "underscore", "backbone", "handlebars", "text!templates/finecaccia.html"],
    function ($, _, Backbone, Handlebars, template) {

    var FineCacciaView = Backbone.View.extend({

        events: {
          "touchend #vai": "goToFrascatiScienza",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = "Caccia al tesoro"; 
            this.moving = false;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
          var elements = document.getElementsByClassName("button_list_element");
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
          }
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        },

        goToFrascatiScienza: function (event) {
          if(this.moving) {
            this.moving = false;
            return;
          }
          if(navigator.connection.type == Connection.NONE) {
            Backbone.history.navigate("frascatiscienza", {trigger: true});
            return;
          }
          window.open("http://www.frascatiscienza.it", '_blank', 'location=yes,closebuttoncaption=chiudi,EnableViewPortScale=yes');
        }
      });

    return FineCacciaView;

  });