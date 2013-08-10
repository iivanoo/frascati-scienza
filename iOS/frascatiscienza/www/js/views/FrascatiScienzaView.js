define(["jquery", "underscore", "backbone", "handlebars", "models/Ente", "text!templates/frascatiscienza.html"],
    function ($, _, Backbone, Handlebars, Ente, template) {

    var FrascatiScienzaView = Backbone.View.extend({

      model: Ente,

      className: "default_wrapper",

      events: {
          "touchend #pulsanteCassetto": "cassetto",
          "touchend #enti": "enti",
          "touchend #sponsor": "sponsor",
          "touchend #continua_frascati": "continua",
          "touchmove": "touchMove"
      },

      initialize: function() {
        this.title = "Frascati Scienza";
        this.moving = false;
      },

      touchMove: function() {
        this.moving = true;
      },

      template: Handlebars.compile(template),

      render: function () {
        // gestione nav bar
        this.updateNavbar();

        $(this.el).html(this.template(this.model.toJSON()));
        var el = $("#titlebar");
        el.removeClass();
        el.addClass("frascatiscienze_top");
        // se siamo in Frascati Scienza e non siamo passati da cover, allora il back è nascosto
        var elements = document.getElementsByClassName("button_list_element");
        for(var i=0; i<elements.length; i++) {
          if(elements[i].id == "frascatiscienza") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if(!elements[i].id.endsWith("Inactive") || elements[i].id == "frascatiscienzaInactive") {
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

      cassetto: function(event) {
        if(this.moving) {
            this.moving = false;
            return;
        } 
        var element = document.getElementById("cassetto");
        element.classList.toggle("chiuso");
        element.classList.toggle("aperto");
      },

      enti: function(event) {
        if(this.moving) {
            this.moving = false;
            return;
        } 
        Backbone.history.navigate("enti", {trigger: true});
        $("#backbutton").show();
      },

      sponsor: function(event) {
        if(this.moving) {
            this.moving = false;
            return;
        } 
        Backbone.history.navigate("sponsor", {trigger: true});
        $("#backbutton").show();
      },

      continua: function(event) {
        if(this.moving) {
            this.moving = false;
            return;
          } 
        Backbone.history.navigate("enti/" + this.model.get("__id"), {trigger: true});
        $("#backbutton").show();
      },
    });

    return FrascatiScienzaView;

  });