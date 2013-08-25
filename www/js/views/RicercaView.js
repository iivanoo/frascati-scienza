define(["jquery", "underscore", "backbone", "collections/Eventi", "datamanager", "handlebars", "text!templates/ricerca.html"],
    function ($, _, Backbone, Eventi, Data, Handlebars, template) {

    var RicercaView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend #ricerca_button": "cerca"
        }, 

        initialize: function() {
          if(!this.title) {
            this.title = "Ricerca Eventi";
          }
        },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "legenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "ricerca") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },

        cerca: function(e) {
          var input1 = "Frascati";
          Backbone.history.navigate("eventiCerca/" + input1.strip(), {trigger: true});
        }
      });

    return RicercaView;

  });