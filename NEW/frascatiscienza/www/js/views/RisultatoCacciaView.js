define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "leaflet", "text!templates/risultatocaccia.html", "datamanager"],
  function($, _, Backbone, Handlebars, Tappa, L, template, Data) {

    var RisultatoCacciaView = Backbone.View.extend({

      tagName: "div",
      id: "mapContainer",

      model: Tappa,

      events: {
        "tap #procedi": "procediPressed"
      },

      initialize: function() {
        this.title = this.model.get("titolo");
        this.on("inTheDom", this.addMap);
      },

      className: "default_wrapper",

      template: Handlebars.compile(template),

      render: function() {
        // gestione nav bar
        this.updateNavbar();
        $(this.el).html(this.template(this.model.toJSON()));
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

      updateNavbar: function() {
        document.getElementById("volatile").classList.remove("nonvisibile");
        var functions = document.getElementsByClassName("button_list_element_small");
        for (var i = 0; i < functions.length; i++) {
          functions[i].classList.add("nonvisibile");
        }
      },

      addMap: function() {
        var options = {
          center: new L.LatLng(this.model.get("luogo").lat, this.model.get("luogo").lon),
          zoom: 16,
          zoomControl: false
        };
        var map = L.map('map', options);

        L.marker([this.model.get("luogo").lat, this.model.get("luogo").lon]).addTo(map);

        var positionIcon = L.icon({
          iconUrl: './res/hereIcon.png',
          iconSize: [20, 20], // size of the icon
        });

        navigator.geolocation.getCurrentPosition(function(position) {
          L.marker([position.coords.latitude, position.coords.longitude], {
            icon: positionIcon
          }).addTo(map);
        }, function() {});

        var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
          maxZoom: 20
        });

        map.addLayer(layer);
      },

      procediPressed: function(e) {
        //Backbone.history.navigate("introcaccia", {trigger: true});
        if (!localStorage.getItem("visitedDomande")) {
          var visited = {
            "visited": []
          };
          localStorage.setItem("visitedDomande", JSON.stringify(visited));
        }
        var visitedDomande = JSON.parse(localStorage.getItem("visitedDomande")).visited;
        var lastTappa = visitedDomande[visitedDomande.length - 1];
        var tappa = Data.getNextTappa(lastTappa);
        if (tappa) {
          var resultText = tappa.get("id");
          var numberOfTappa = parseInt(resultText.replace("tappa", "").charAt(0));
          if (numberOfTappa != (visitedDomande.length + 1)) {
            navigator.notification.alert('Attenzione, è stata saltata qualche tappa, torna all\'ultima tappa visitata e segui il suggerimento.', function() {
              Backbone.history.navigate("introcaccia", {
                trigger: true
              });
            }, "Attenzione");
            return;
          }
          visitedDomande.push(resultText);
          localStorage.setItem("visitedDomande", JSON.stringify({
            "visited": visitedDomande
          }));
          Backbone.history.navigate("introcaccia", {
            trigger: true
          });
          // Backbone.history.navigate("introtappa/" + resultText, {
          //   trigger: true
          // });
        } else {
          navigator.notification.alert('Errore nel procedere alla prossima tappa della caccia, si prega di riprovare.', function() {}, "Attenzione");
        }
      }
    });

    return RisultatoCacciaView;

  });