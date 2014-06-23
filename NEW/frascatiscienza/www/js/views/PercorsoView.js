define(["jquery", "underscore", "backbone", "handlebars", "datamanager", "text!templates/percorso.html"],
  function($, _, Backbone, Handlebars, Data, template) {

    var PercorsoView = Backbone.View.extend({

      initialize: function() {
        this.title = this.model.get("nome");
      },

      events: {
        "tap .row_wrapper": "goToTappa"
      },

      tagName: "div",

      className: "defaultlist_wrapper",

      template: Handlebars.compile(template),

      render: function() {
        // gestione nav bar
        this.updateNavbar();
        $(this.el).empty();

        // var percorsi = {percorsi: this.model.toJSON()};
        // var numTappe;
        // for(var i=0; i<percorsi.percorsi.length; i++) {
        //   numTappe = percorsi.percorsi[i].tappe.length;
        //   percorsi.percorsi[i].numtappe = (numTappe === 1) ? numTappe + " tappa" : numTappe + " tappe";
        // }
        var tappe = {tappe: this.model.get("tappe")};
        for(var i=0; i<tappe.tappe.length; i++) {
          if(tappe.tappe[i].id_ente) {
            tappe.tappe[i].testo = Data.enti.findWhere({__id: tappe.tappe[i].id_ente}).get("titolo");
          } else {
            tappe.tappe[i].testo = tappe.tappe[i].titolo;
          }
          tappe.tappe[i].numero = i + 1;
        }
        $(this.el).html(this.template(tappe));

        var el = $("#titlebar");
        el.removeClass();
        el.addClass("frascatiscienze_top");
        var elements = document.getElementsByClassName("button_list_element");
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].id == "percorsi") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if (!elements[i].id.endsWith("Inactive") || elements[i].id == "percorsiInactive") {
              elements[i].classList.add("nonvisibile");
            } else {
              elements[i].classList.remove("nonvisibile");
            }
          }
        }
        return this;
      },

      updateNavbar: function() {
        document.getElementById("volatile").classList.remove("nonvisibile");
        var functions = document.getElementsByClassName("button_list_element_small");
        for (var i = 0; i < functions.length; i++) {
          functions[i].classList.add("nonvisibile");
        }
      },

      goToTappa: function(event) {
        var tappedTappa = this.model.get("tappe").findWhere({id: event.currentTarget.id});
        if(tappedTappa.has("id_ente")) {
          Backbone.history.navigate("enti/" + tappedTappa.get("id_ente"), {trigger: true}); 
        } else {
          Backbone.history.navigate("tappa/" + tappedTappa.get("id"), {trigger: true}); 
        }
      }
    });

    return PercorsoView;

  });