define(["jquery", "underscore", "backbone", "handlebars", "datamanager", "text!templates/percorsodetails.html"],
  function($, _, Backbone, Handlebars, Data, template) {

    var PercorsoDetailsView = Backbone.View.extend({

      initialize: function() {
        this.title = this.model.get("nome");
        this.on("inTheDom", function(e) {
          document.getElementById("mappa_butt").classList.remove("nonvisibile");
        });
        this.on("removed", function(e) {
          document.getElementById("mappa_butt").classList.add("nonvisibile");
        });
      },

      events: {
        "tap #tappe": "goToTappe"
      },

      tagName: "div",

      className: "default_wrapper",

      template: Handlebars.compile(template),

      render: function() {
        // gestione nav bar
        this.updateNavbar();
        this.model.set("descrizione", this.model.get("testo").strip());
        var el = $("#titlebar");
        el.removeClass();
        el.addClass("frascatiscienze_top");
        $(this.el).html(this.template(this.model.toJSON()));
        
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
        return this;
      },

      updateNavbar: function() {
        document.getElementById("volatile").classList.remove("nonvisibile");
        var functions = document.getElementsByClassName("button_list_element_small");
        for (var i = 0; i < functions.length; i++) {
          functions[i].classList.add("nonvisibile");
        }
      },

      goToTappe: function(event) {
        Backbone.history.navigate("percorso/" + this.model.get("__id"), {
          trigger: true
        });
      },

      mappa: function(event) {
        var path = "mappapercorso/" + this.model.get("__id");
        Backbone.history.navigate(path, {
          trigger: true
        });
      }
    });

    return PercorsoDetailsView;

  });