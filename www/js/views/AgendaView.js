define(["jquery", "underscore", "backbone", "handlebars", "views/AgendaListItemView", "models/Ente", "models/Evento", "text!templates/agenda.html"],
    function ($, _, Backbone, Handlebars, AgendaListItemView, Ente, Evento, template) {

    var AgendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Agenda Personale";
            this.moving = false;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend #ling_eventi": "showEventi",
          "touchend #ling_enti": "showEnti",
          "touchmove": "touchMove"
        },

        touchMove: function() {
          this.moving = true;
        },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var elem = $("#titlebar");
          elem.removeClass();
          elem.addClass("agenda_top");
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
          this.on("inTheDom", this.showEnti);
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        },

        showEnti: function() {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var enti = JSON.parse(localStorage.getItem("agenda")).enti;
          $("#agenda_wrapper_content").empty();
          for (var key in enti) {
            var currentEnte = enti[key];
            $("#agenda_wrapper_content").append(new AgendaListItemView({
              model: new Ente(currentEnte)
            }).render().el);
          }
        },

        showEventi: function() {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var eventi = JSON.parse(localStorage.getItem("agenda")).eventi;
          $("#agenda_wrapper_content").empty();
          for (var key in eventi) {
            var currentEvento = eventi[key];
            $("#agenda_wrapper_content").append(new AgendaListItemView({
              model: new Evento(currentEvento)
            }).render().el);
          }
        }
      });

    return AgendaView;

  });