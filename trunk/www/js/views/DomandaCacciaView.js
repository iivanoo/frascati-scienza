define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "text!templates/domandacaccia.html"],
    function ($, _, Backbone, Handlebars, Tappa, template) {

    var RisultatoCacciaView = Backbone.View.extend({

        model: Tappa,

        events: {
          "touchend .risposta": "domandaPressed",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = this.model.get("titolo");
            this.moving = false;
            this.on("inTheDom", this.start); 
            this.seconds = parseInt(localStorage.getItem("cacciaSeconds"));
        },

        touchMove: function() {
          this.moving = true;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          //this.updateNavbar();

          $(this.el).html(this.template(this.model.toJSON()));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
/*          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "caccia") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "cacciaInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }*/
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        },

        start: function (event) {
          // tempo in Unix time
          this.startTimestamp = new Date().getTime();
          var self = this;
          var clockText = document.getElementById("clockText");

          this.interval = window.setInterval(function() {
            self.seconds++;
            var now = new Date().getTime();
            //var diff = Math.floor((now - self.startTimestamp) / 1000);
            var hours   = Math.floor(self.seconds / 3600);
            var minutes = Math.floor((self.seconds - (hours * 3600)) / 60);
            var seconds = self.seconds - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {
              hours   = "0"+hours;
            }
            if (minutes < 10) {
              minutes = "0"+minutes;
            }
            if (seconds < 10) {
              seconds = "0"+seconds;
            }
            clockText.innerHTML = hours + " : " + minutes + " : " + seconds;
          }, 1000);
        },

        domandaPressed: function (e) {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var idDomanda = e.currentTarget.id.charAt(e.currentTarget.id.length - 1);
          if(idDomanda == this.model.get("rispostacorretta")) {
            // gestire domanda corretta
            var self = this;
            window.clearInterval(this.interval);
            document.getElementById(e.currentTarget.id).classList.add("rvera");
            localStorage.setItem("cacciaSeconds" , "" + this.seconds);
            setTimeout(function(){
              Backbone.history.navigate("risultatocaccia/" + self.model.id, {trigger: true});
            }, 1000);
          } else {
            // gestire domanda sbagliata
            document.getElementById(e.currentTarget.id).classList.add("rfalsa");
            navigator.notification.vibrate(500);
            this.seconds = this.seconds + 30;
          }
        }
      });

    return RisultatoCacciaView;

  });