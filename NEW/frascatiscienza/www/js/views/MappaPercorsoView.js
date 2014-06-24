define(["jquery", "underscore", "backbone", "models/Percorso", "handlebars", "leaflet", "datamanager", "text!templates/mappa.html"],
  function($, _, Backbone, Percorso, Handlebars, L, Data, template) {

    var MappaPercorsoView = Backbone.View.extend({

      tagName: "div",
      id: "map",

      // come model qui bisogna passargli l'evento, l'ente o la tappa

      initialize: function() {
        if (this.model.has("nome")) {
          this.title = this.model.get("nome");
        }
        this.on("inTheDom", this.addMap);
      },

      template: Handlebars.compile(template),

      render: function() {
        this.updateNavbar();
        $(this.el).html(this.template({}));
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

      addMap: function() {
        var currentEnte;
        if (this.model.get("tappe").length > 0) {

          var tappe = this.model.get("tappe").toJSON();
          for (var i = 0; i < tappe.length; i++) {
            if (tappe[i].id_ente) {
              currentEnte = Data.enti.findWhere({
                __id: tappe[i].id_ente
              });
              tappe[i].testo = currentEnte.get("titolo");
              tappe[i].luogo = currentEnte.get("luogo");
            } else {
              tappe[i].testo = tappe[i].titolo;
            }
            tappe[i].numero = i + 1;
          }

          var options = {
            center: new L.LatLng(tappe[0].luogo.lat, tappe[0].luogo.lon),
            zoom: 12
          };
          var map = L.map('map', options);
          var marker;
          var popupContent;

          for (var i = 0; i < tappe.length; i++) {
            if (tappe[i].id_ente) {
              tappe[i].id = tappe[i].id_ente;
              tappe[i].isente = true;
            } else {
              tappe[i].isente = false;
            }
            marker = L.marker([tappe[i].luogo.lat, tappe[i].luogo.lon]);
            marker.addTo(map);
            var popupContent = $('<div />');
            popupContent.on('click', '.tappaButton', function(e) {
              if (e.currentTarget.getAttribute("data-isente") === "true") {
                Backbone.history.navigate("enti/" + e.currentTarget.id, {
                  trigger: true
                });
              } else {
                Backbone.history.navigate("tappa/" + e.currentTarget.id, {
                  trigger: true
                });
              }
            });
            popupContent.html(tappe[i].testo + '<br><button class="tappaButton" id="' + tappe[i].id + '" data-isente="' + tappe[i].isente + '">Vai</button>');
            marker.bindPopup(popupContent[0]);
          }

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
            attribution: 'Map data &copy; OpenStreetMap',
            maxZoom: 20
          });

          map.addLayer(layer);
        }
      },

      updateNavbar: function() {
        document.getElementById("volatile").classList.remove("nonvisibile");
        var functions = document.getElementsByClassName("button_list_element_small");
        for (var i = 0; i < functions.length; i++) {
          functions[i].classList.add("nonvisibile");
        }
      }
    });

    return MappaPercorsoView;

  });