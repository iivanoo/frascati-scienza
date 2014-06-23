define(["jquery", "underscore", "backbone", "handlebars", "text!templates/percorsi.html"],
    function ($, _, Backbone, Handlebars, template) {

    var PercorsiView = Backbone.View.extend({

        initialize: function() {
            this.title = "Percorsi tematici";
        },

        events: {
          "tap .row_wrapper": "goToPercorso"
        },

        tagName: "div",

        id: "percorsi_list",

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          $(this.el).empty();
          var percorsi = {percorsi: this.model.toJSON()};
          var numTappe;
          for(var i=0; i<percorsi.percorsi.length; i++) {
            numTappe = percorsi.percorsi[i].tappe.length;
            percorsi.percorsi[i].numtappe = (numTappe === 1) ? numTappe + " tappa" : numTappe + " tappe";
          }
          //$(this.el).attr("id", this.model.get("__id"));
          $(this.el).html(this.template(percorsi));

          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "percorsi") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "percorsiInactive") {
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

        goToPercorso: function (event) {
          if(event.currentTarget.id === "cacciaList") {
            Backbone.history.navigate("caccia", {trigger: true});
          } else {
            Backbone.history.navigate("percorso/" + event.currentTarget.id, {trigger: true});
          }
        }
      });

    return PercorsiView;

  });