define(["jquery", "underscore", "backbone", "handlebars", "datamanager", "text!templates/introcaccia.html"],
    function ($, _, Backbone, Handlebars, Data, template) {

    var IntroCacciaView = Backbone.View.extend({

        events: {
          "touchend #qrcode": "readqrcode",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = "Caccia al tesoro"; 
            this.moving = false;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
          var elements = document.getElementsByClassName("button_list_element");
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

        readqrcode: function (event) {
          if(this.moving) {
            this.moving = false;
            return;
          }
          /*scanner = cordova.require("cordova/plugin/BarcodeScanner");
          scanner.scan(
            function (result) {*/
              var result = {text: "tappa8123"};
              console.log("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
              if(!result.cancelled) {
                //Backbone.history.navigate("introtappa/" + result.text, {trigger: true});
                var tappa = Data.getTappaById(result.text);
                if(tappa) {
                  // controllare se il QR code era già stato scansionato
                  if(!localStorage.getItem("visitedDomande")) {
                    var visited = {"visited": []};
                    localStorage.setItem("visitedDomande", JSON.stringify(visited));
                  }
                  var visitedDomande = JSON.parse(localStorage.getItem("visitedDomande")).visited;
                  for(var i=0; i<visitedDomande.length; i++) {
                    if(visitedDomande[i] == result.text) {
                      navigator.notification.alert('Il QR code scansionato era già stato letto in precedenza.', function() {
                        Backbone.history.navigate("risultatocaccia/" + result.text, {trigger: true});
                      }, "Attenzione");
                      return;
                    }
                  }
                  visitedDomande.push(result.text);
                  localStorage.setItem("visitedDomande", JSON.stringify({"visited": visitedDomande})); 
                  Backbone.history.navigate("introtappa/" + result.text, {trigger: true});
                } else {
                  navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
                }
              }
/*            },
            function (error) {
              navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
            }
          ); */
        }
      });

    return IntroCacciaView;

  });