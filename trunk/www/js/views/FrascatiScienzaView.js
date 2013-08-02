define(["jquery", "underscore", "backbone", "handlebars", "models/Ente", "text!templates/frascatiscienza.html"],
    function ($, _, Backbone, Handlebars, Ente, template) {

    var FrascatiScienzaView = Backbone.View.extend({

      model: Ente,

      className: "default_wrapper",

      events: {
          "touchend #cassetto": "cassetto",
          "touchend #enti": "enti",
          "touchend #sponsor": "sponsor",
          "touchend #continua_frascati": "continua"
      },

      initialize: function() {
        this.title = "Frascati Scienza";
      },

      template: Handlebars.compile(template),

      render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var a = Backbone.history.history.length;
        // se siamo in Frascati Scienza e non siamo passati da cover, allora il back è nascosto
        if(Backbone.history.history.length <= 1) {
          $("#backbutton").hide();
        }
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

      cassetto: function(event) {
        var element = document.getElementById(event.currentTarget.id);
        element.classList.toggle("chiuso");
        element.classList.toggle("aperto");
      },

      enti: function(event) {
        Backbone.history.navigate("enti", {trigger: true});
        $("#backbutton").show();
      },

      sponsor: function(event) {
        Backbone.history.navigate("sponsor", {trigger: true});
        $("#backbutton").show();
      },

      continua: function(event) {
        Backbone.history.navigate("enti/" + this.model.cid, {trigger: true});
        $("#backbutton").show();
      },
    });

    return FrascatiScienzaView;

  });