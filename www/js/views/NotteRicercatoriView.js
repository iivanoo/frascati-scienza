/*define(["jquery", "underscore", "backbone", "handlebars", "text!templates/nottericercatori.html"],
    function ($, _, Backbone, Handlebars, template) {

    var NotteRicercatoriView = Backbone.View.extend({

        initialize: function() {
            this.title = "Notte dei Ricercatori";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "eventi") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }
          return this;
        }
      });

    return NotteRicercatoriView;

  });*/