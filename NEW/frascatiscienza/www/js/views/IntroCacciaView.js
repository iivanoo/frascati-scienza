define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "datamanager", "text!templates/introcaccia.html"],
    function ($, _, Backbone, Handlebars, Tappa, Data, template) {

    var IntroCacciaView = Backbone.View.extend({

        events: {
          "tap #qrcode": "readqrcode",
          "tap #mappa": "showMappa",
          "tap #jump": "jump"
          // "touchmove": "touchMove"
        },

        initialize: function() {
          this.model = new Tappa({titolo: "Caccia al tesoro", luogo: {lat: "41.903423", lon: "12.4802"}});
            this.title = "Caccia al tesoro";
            // this.moving = false;
            this.on("inTheDom", this.attachListener);
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          var context = {stepByStep: this.stepByStep};
          $(this.el).html(this.template(context));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
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
        },

        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },

        readqrcode: function (event) {
/*          if(this.moving) {
            this.moving = false;
            return;
          }*/

          //scanner = cordova.require("cordova/plugin/BarcodeScanner");
          cordova.plugins.barcodeScanner.scan(
            function (result) {
              // var result = {text: "tappa8123"};
              // console.log("We got a barcode\n" +
              //     "Result: " + result.text + "\n" +
              //     "Format: " + result.format + "\n" +
              //     "Cancelled: " + result.cancelled);
              if(!result.cancelled) {
                //Backbone.history.navigate("introtappa/" + result.text, {trigger: true});
                var qrCodePrefix = "http://www.frascatiscienza.it/pagine/app/?percorso=";
                var resultText = result.text;
                if(resultText.startsWith(qrCodePrefix)) {
                  //resultText = result.text.replace(qrCodePrefix, "");
                  // tolgo la parte relativa a &tappa=
                  // la stringa completa ha il pattern http://www.frascatiscienza.it/pagine/app/?percorso=<ID_PERCORSO>&tappa=<ID_TAPPA> 
                  resultText = resultText.substring(resultText.indexOf("&tappa=") + 7, resultText.length);
                }
                var tappa = Data.getTappaById(resultText);
                if(tappa) {
                  // controllare se il QR code era già stato scansionato
                  if(!localStorage.getItem("visitedDomande")) {
                    var visited = {"visited": []};
                    localStorage.setItem("visitedDomande", JSON.stringify(visited));
                  }
                  var visitedDomande = JSON.parse(localStorage.getItem("visitedDomande")).visited;
                  for(var i=0; i<visitedDomande.length; i++) {
                    if(visitedDomande[i] == resultText) {
                      navigator.notification.alert('Il QR code scansionato era già stato letto in precedenza.', function() {
                        Backbone.history.navigate("risultatocaccia/" + resultText, {trigger: true});
                      }, "Attenzione");
                      return;
                    }
                  }
                  var numberOfTappa = parseInt(resultText.replace("tappa", "").charAt(0));
                  if(numberOfTappa != (visitedDomande.length + 1)) {
                    var alertFunc;
                    if(device.platform === "Android") {
                      alertFunc = alert;
                    } else {
                      alertFunc = navigator.notification.alert;
                    }
                    alertFunc('Attenzione, è stata saltata qualche tappa, torna all\'ultima tappa visitata e segui il suggerimento.', function() {
                        Backbone.history.navigate("introcaccia", {trigger: true});
                      }, "Attenzione");
                      return;
                  }
                  visitedDomande.push(resultText);
                  localStorage.setItem("visitedDomande", JSON.stringify({"visited": visitedDomande})); 
                  Backbone.history.navigate("introtappa/" + resultText, {trigger: true});
                } else {
                  var alertFunc;
                  if(device.platform === "Android") {
                    alertFunc = alert;
                  } else {
                    alertFunc = navigator.notification.alert;
                  }
                  alertFunc('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
                }
              }
            },
            function (error) {
              var alertFunc;
              if(device.platform === "Android") {
                alertFunc = alert;
              } else {
                alertFunc = navigator.notification.alert;
              }
              alertFunc('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
            }
          );
        },
        jump: function (event) {
          if(!localStorage.getItem("visitedDomande")) {
              var visited = {"visited": []};
              localStorage.setItem("visitedDomande", JSON.stringify(visited));
            }
          var visitedDomande = JSON.parse(localStorage.getItem("visitedDomande")).visited;
          var lastTappa = visitedDomande[visitedDomande.length - 1];
          var tappa = Data.getNextTappa(lastTappa);
          if(tappa) {
            var resultText = tappa.get("id");
            // controllare se il QR code era già stato scansionato
            for(var i=0; i<visitedDomande.length; i++) {
              if(visitedDomande[i] == resultText) {
                var alertFunc;
                if(device.platform === "Android") {
                  alertFunc = alert;
                } else {
                  alertFunc = navigator.notification.alert;
                }
                alertFunc('La tappa attuale era già stata letta in precedenza.', function() {
                  Backbone.history.navigate("risultatocaccia/" + resultText, {trigger: true});
                }, "Attenzione");
                return;
              }
            }
            var numberOfTappa = parseInt(resultText.replace("tappa", "").charAt(0));
            if(numberOfTappa != (visitedDomande.length + 1)) {
              var alertFunc;
              if(device.platform === "Android") {
                alertFunc = alert;
              } else {
                alertFunc = navigator.notification.alert;
              }
              alertFunc('Attenzione, è stata saltata qualche tappa, torna all\'ultima tappa visitata e segui il suggerimento.', function() {
                  Backbone.history.navigate("introcaccia", {trigger: true});
                }, "Attenzione");
                return;
            }
            visitedDomande.push(resultText);
            localStorage.setItem("visitedDomande", JSON.stringify({"visited": visitedDomande})); 
            Backbone.history.navigate("introtappa/" + resultText, {trigger: true});
          } else {
            var alertFunc;
            if(device.platform === "Android") {
              alertFunc = alert;
            } else {
              alertFunc = navigator.notification.alert;
            }
            alertFunc('Errore nel procedere alla prossima tappa della caccia, si prega di riprovare.', function() {}, "Attenzione");
          }
        }
      });

    return IntroCacciaView;

  });