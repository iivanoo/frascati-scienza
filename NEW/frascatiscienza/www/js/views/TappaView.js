define(["jquery", "underscore", "backbone", "models/Tappa", "handlebars", "text!templates/tappa.html"],
    function ($, _, Backbone, Tappa, Handlebars, template) {

    var TappaView = Backbone.View.extend({

        model: Tappa,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
            this.on("inTheDom", this.attachListener);
          },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          

          $(this.el).html(this.template(this.model.toJSON()));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "www") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "mappa") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },
        
        attachListener: function() {
          var self  = this;
          if(document.getElementById("video")) {
            document.getElementById("video").addEventListener("click", function(e) {
              if(self.playing) {
                self.playing = false;
                this.pause();
              } else {
                self.playing = true;
                this.play();
              }
            }, false);
          }
        }
      });

    return TappaView;

  });