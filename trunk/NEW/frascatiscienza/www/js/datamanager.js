define(["jquery", "underscore", "backbone", "preloader", "models/Ente", "models/Evento", "models/Tappa", "models/Sponsor", "collections/Enti", "collections/Eventi", "collections/Percorsi", "models/TappaPercorso", "collections/TappePercorsi", "collections/Sponsors", "spin", "../data/staticenti", "../data/staticeventi", "../data/statictappe", "../data/staticpercorsi"],
  function($, _, Backbone, Preloader, Ente, Evento, Tappa, Sponsor, Enti, Eventi, Percorsi, TappaPercorso, TappePercorsi, Sponsors, Spinner) {

    var Data = {
      enti: new Enti,
      eventi: new Eventi,
      percorsi: new Percorsi,
      tappe: undefined,
      // sponsors: new Sponsors,
      newDataChecked: false,
      spinner: undefined,
      frascatiscienza: undefined,
      imgfrascatiscienza: undefined,
      staticEnti: undefined,
      staticEventi: undefined,
      staticPercorsi: undefined,
      urlEnti_Ita: "http://www.frascatiscienza.it/pagine/js-enti/",
      urlEventi_Ita: "http://www.frascatiscienza.it/pagine/js-eventi/",
      //urlEventi_Ita: "http://www.di.univaq.it/malavolta/files/frascatiEventi2.json",
      urlpercorsi_Ita: "http://www.frascatiscienza.it/pagine/js-percorsi/",

      initialize: function() {
        var opts = {
          lines: 5, // The number of lines to draw
          length: 15, // The length of each line
          width: 5, // The line thickness
          radius: 15, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#fff', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '120px', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        this.spinner = new Spinner(opts);
        // settiamo nel local storage la lista dei preferiti
        if (!localStorage.getItem("agenda")) {
          var agenda = {
            "enti": {},
            "eventi": {}
          };
          localStorage.setItem("agenda", JSON.stringify(agenda));
        }
        this.enti.on('reset', this.checkDataReady, this);
        this.eventi.on('reset', this.checkDataReady, this);
        this.percorsi.on('reset', this.checkDataReady, this);
        // this.sponsors.on('reset', this.checkDataReady, this);
      },

      getTappaById: function(id) {
        var i = 0;
        while (i < this.tappe.length) {
          if (this.tappe[i].id == id) {
            var tappaModel = new Tappa(this.tappe[i]);
            return tappaModel;
          }
          i++;
        }
        return undefined;
      },

      getNextTappa: function(id) {
        var i = 0;
        while (i < this.tappe.length - 1) {
          if (this.tappe[i].id == id) {
            var tappaModel = new Tappa(this.tappe[i + 1]);
            return tappaModel;
          }
          i++;
        }
        // di default se va tutto male ritorno la prima tappa
        return new Tappa(this.tappe[0]);
      },

      startupData: function() {
        this.enti = new Enti;
        this.eventi = new Eventi;
        this.percorsi = new Percorsi;
        this.tappe =  undefined;
        this.enti.on('reset', this.checkDataReady, this);
        this.eventi.on('reset', this.checkDataReady, this);
        this.percorsi.on('reset', this.checkDataReady, this);
        if (!localStorage.getItem("cacciaSeconds")) {
          localStorage.setItem("cacciaSeconds", "0");
        }
        var staticTappe = require("../data/statictappe");
        this.tappe = staticTappe.tappe;
        //qui controlliamo se ci sono dati nuovi
        if (navigator.connection.type == Connection.NONE) {
          if (localStorage.getItem("dataLoaded")) {
            this.loadDbData();
          } else {
            this.loadLocalData();
          }
        } else {
          this.downloadNewData();
        }
        //this.loadLocalData();
      },

      loadDbData: function() {
        this.frascatiscienza = localStorage.getItem("frascatiscienza");
        this.imgfrascatiscienza = localStorage.getItem("imgfrascatiscienza");
        this.enti.fetch({
          reset: true
        });
        this.eventi.fetch({
          reset: true
        });
        this.percorsi.fetch({
          reset: true
        });
        notteRicercatori = JSON.parse(localStorage.getItem("notte2014"));
        var self = this;
        setTimeout(function() {
          self.checkDataReady();
        }, 1000);
        // this.sponsors.fetch({reset: true});
      },
      checkDataReady: function() {
        if ((this.enti.length > 0) && (this.eventi.length > 0) && (this.percorsi.length >= 0)) { // && (this.sponsors.length > 0)) {
          // quando scateno questo evento, allora ho fatto il fetch di tutti i dati
          // è dopo aver scatenato questo evento che faccio partire il routing
          this.trigger("dataReady");
          var images = [];
          var currentElement;
          for (var i = 0; i < this.enti.length; i++) {
            currentElement = this.enti.at(i);
            images.push(currentElement.get("logo"));
            images.push(currentElement.get("chisiamo").immagineCopertina);
            images.push(currentElement.get("storia").immagineCopertina);
            images.push(currentElement.get("miglioriamo").immagineCopertina);
            images.push(currentElement.get("contatti").immagineCopertina);
          }
          for(var i=0; i<this.eventi.length; i++) {
            this.eventi.at(i).isNotte = isNotte;
          }
          new Preloader(images);
        }
      },
      loadLocalData: function() {
        var staticEnti = require("../data/staticenti");
        var staticEventi = require("../data/staticeventi");
        var staticPercorsi = {
          percorsi: []
        };
        this.updateDb(staticEnti, staticEventi, staticPercorsi, true);
        localStorage.setItem("dataLoaded", "yes");
      },
      /*    checkNewData: function() {
      newDataChecked = true;
      if (localStorage.getItem("language") === "eng") {
        navigator.notification.confirm('New data available, do you want to update it?', this.downloadNewData, 'New Data Available', 'Yes,No');
      } else {
        navigator.notification.confirm('Sono disponibili nuovi dati, vuoi scaricarli ora?', this.downloadNewData, 'Dati Aggiornati', 'Si,No');
      }
    },*/
      downloadNewData: function() { //buttonIndex) {
        //if (buttonIndex == 1) {
        self = this;
        // $.ajaxSetup({
        //   async: false
        // });
        $.ajaxSettings.async = false;
        $.ajaxSettings.crossDomain = true;
        $.ajaxSettings.timeout = 30000;
        $.getJSON(this.urlEnti_Ita, function(response) {
          self.staticEnti = response;
        }).fail(function() {
          self.staticEnti = undefined;
          //self.staticEnti = require("../data/staticenti");
        });
        $.getJSON(this.urlpercorsi_Ita, function(response) {
          self.staticPercorsi = response;
        }).fail(function() {
          self.staticPercorsi = undefined;
          //self.staticPercorsi = require("../data/staticpercorsiempty");
        });
        $.getJSON(this.urlEventi_Ita, function(response) {
          self.staticEventi = response;
        }).fail(function(error) {
          self.staticEventi = undefined;
          //self.staticEventi = require("../data/staticeventi");
        });
        // $.ajaxSetup({
        //   async: true
        // });
        $.ajaxSettings.async = true;
        $.ajaxSettings.crossDomain = false;
        if (this.staticEnti && this.staticEventi && this.staticPercorsi) {
          this.updateDb(this.staticEnti, this.staticEventi, this.staticPercorsi, true);
        } else {
          if (localStorage.getItem("dataLoaded")) {
            this.loadDbData();
          } else {
            this.loadLocalData();
          }
        }
        //}
      },
      /*    newDataAvailable: function() {
      var result = false;
      var url;
      if (localStorage.getItem("language") === "eng") {
        url = 'urlEnglish';
      } else {
        url = 'urlItalian';
      }
      $.getJSON(url, function(response) {
        if(response.timestamp > localStorage.getItem("lastTimestamp")) {
          result = true;
          staticData = response;
        }
      });
      return result;
    },*/
      updateDb: function(enti, eventi, percorsi, clearDb) {
        var self = this;
        if (clearDb) {
          // cancello tutti i record delle tabelle
          db.transaction(function(tx) {
            tx.executeSql("DELETE FROM enti");
            tx.executeSql("DELETE FROM eventi");
            tx.executeSql("DELETE FROM percorsi");
            // tx.executeSql("DELETE FROM sponsors");
          }, function() {}, createData);
        } else {
          createData();
        }

        // enti e eventi qui sono accessibili dalla closure
        function createData() {
          // gli underscore li aggiungiamo direttamente nel datamanager quando carichiamo i vari eventi
          var tagClasses = {
            giovani_2: "ad_giovani",
            pubblico_generale: "ad_pubblicogenerale",
            scuole_medie: "ad_medie",
            scuole_elementari: "ad_elementari",
            scuole_superiori: "ad_superiori",
            aperitivi_scientifici: "ad_aperitivi",
            giochi_scientifici: "ad_giochiscientifici",
            laboratori: "ad_laboratori",
            seminario: "ad_seminari",
            qr_code: "ad_qrcode"
          };

          var currentElement;
          self.frascatiscienza = enti.frascatiscienza;
          self.imgfrascatiscienza = enti.imgfrascatiscienza;
          localStorage.setItem("frascatiscienza", self.frascatiscienza);
          localStorage.setItem("imgfrascatiscienza", self.imgfrascatiscienza);
          localStorage.setItem("lastTimestamp", enti.timestamp);
          for (var i = 0; i < enti.enti.length; i++) {
            currentElement = enti.enti[i];
            currentElement.__id = currentElement.id;
            delete currentElement.id;
            self.enti.create(currentElement);
          }
          for (var i = 0; i < eventi.eventi.length; i++) {
            currentElement = eventi.eventi[i];
            // dobbiamo scartare l'evento con id uguale a notte2014, perchè è l'evento fittizio che rappresenta la Notte dei Ricercatori 2014.
            if(currentElement.id != "notte2014") {
              currentElement.__id = currentElement.id;
              for (var j = 0; j < currentElement.tag.length; j++) {
                if(tagClasses[currentElement.tag[j].replace(" ", "_").replace("-", "_")]) {
                  currentElement.tag[j] = tagClasses[currentElement.tag[j].replace(" ", "_").replace("-", "_")];
                }
              }
              for (var j = 0; j < currentElement.targets.length; j++) {
                if(tagClasses[currentElement.targets[j].replace(" ", "_").replace("-", "_")]) {
                  currentElement.tag.push(tagClasses[currentElement.targets[j].replace(" ", "_").replace("-", "_")]);
                }
              }
              for (var j = 0; j < currentElement.categories.length; j++) {
                if(tagClasses[currentElement.categories[j].replace(" ", "_").replace("-", "_")]) {
                  currentElement.tag.push(tagClasses[currentElement.categories[j].replace(" ", "_").replace("-", "_")]);
                }
              }
              if (currentElement.macroevento == 193) {
                currentElement.nottericercatori = true;
              } else {
                currentElement.nottericercatori = false;
              }
              delete currentElement.id;
              var justCreatedModel = self.eventi.create(currentElement);
              justCreatedModel.isNotte = isNotte;
            } else {
              // qui mettiamo in una variabile globale la url e descrizione del'evento fittizio della Notte dei Ricercatori
              notteRicercatori = currentElement;
              localStorage.setItem("notte2014", JSON.stringify(notteRicercatori));
            }
          }

          // qui limitiamo la lunghezza dell'array dei percorsi a 5 elementi.
          for (var i = 0; i < percorsi.percorsi.length && (i < 5); i++) {
            currentElement = percorsi.percorsi[i];
            currentElement.__id = currentElement.id;
            delete currentElement.id;
            var justCreatedModel = self.percorsi.create(currentElement);
            setTappe(justCreatedModel);
          }

          function setTappe(modello) {
            // qui limitiamo la lunghezza dell'array delle tappe a 5 elementi.
            for (var i = 0; i < modello.get("tappe").length && (i < 5); i++) {
              modello.get("tappe")[i] = new TappaPercorso(modello.get("tappe")[i]);
            }
            modello.set("tappe", new TappePercorsi(modello.get("tappe")));
          }
        }
        localStorage.setItem("dataLoaded", "yes");
        setTimeout(function() {
          self.checkDataReady();
        }, 1000);
      }
    };

    _.extend(Data, Backbone.Events);
    return Data;

  });

function isNotte() {
  return _.contains(this.get("macroevento"), 290);
}