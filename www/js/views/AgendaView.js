define(["jquery", "underscore", "backbone", "handlebars", "text!templates/agenda.html"],
    function ($, _, Backbone, Handlebars, template) {

    var AgendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Agenda Personale";
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
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
        }
      });

    return AgendaView;

  });