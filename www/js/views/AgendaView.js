define(["jquery", "underscore", "backbone", "handlebars", "text!templates/agenda.html"],
    function ($, _, Backbone, Handlebars, template) {

    var AgendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Agenda Personale";
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("agenda_top");
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "agenda") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "agendaInactive") {
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
        }
      });

    return AgendaView;

  });