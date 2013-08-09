define(["jquery", "underscore", "backbone", "models/Ente", "models/Evento", "models/Sponsor", "collections/Enti", "collections/Eventi", "collections/Sponsors", "spin", "staticdata", "staticeventi"], function($, _, Backbone, Ente, Evento, Sponsor, Enti, Eventi, Sponsors, Spinner) {

  var Data = {
    enti: new Enti,
    eventi: new Eventi,
    // sponsors: new Sponsors,
    newDataChecked: false,
    spinner: undefined,
    frascatiscienza: undefined,
    imgfrascatiscienza: undefined,
    staticData: undefined,

    initialize: function() {
      var opts = {
        lines: 5, // The number of lines to draw
        length: 15, // The length of each line
        width: 5, // The line thickness
        radius: 15, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      this.spinner = new Spinner(opts);
      
      // settiamo nel local storage la lista dei preferiti
      if(!localStorage.getItem("agenda")) {
        var agenda = {"enti": {}, "eventi": {}};
        localStorage.setItem("agenda", JSON.stringify(agenda));
      } 
      this.enti.on('reset', this.checkDataReady, this);
      this.eventi.on('reset', this.checkDataReady, this);
      // this.sponsors.on('reset', this.checkDataReady, this);
    },
    loadDbData: function() {
      // visualizza Spinner
      var target = document.getElementById('content');
      this.spinner.spin(target);
      this.frascatiscienza = localStorage.getItem("frascatiscienza");
      this.imgfrascatiscienza = localStorage.getItem("imgfrascatiscienza");
      this.enti.fetch({reset: true});
      this.eventi.fetch({reset: true});
      // this.sponsors.fetch({reset: true});
    },
    checkDataReady: function() {
      if((this.enti.length > 0) && (this.eventi.length > 0)) { // && (this.sponsors.length > 0)) {
        // quando scateno questo evento, allora ho fatto il fetch di tutti i dati
        // è dopo aver scatenato questo evento che faccio partire il routing
        this.trigger("dataReady");
        // chiudi Spinner
        this.spinner.stop();
      }
    },
    loadLocalData: function() {
      // visualizza Spinner
      var target = document.getElementById('content');
      this.spinner.spin(target);
      var staticData = require("staticdata");
      var staticEventi = require("staticeventi");
      this.updateDb(staticData, staticEventi, true);
      localStorage.setItem("dataLoaded" , "yes");
    },
    checkNewData: function() {
      newDataChecked = true;
      if (localStorage.getItem("language") === "eng") {
        navigator.notification.confirm('New data available, do you want to update it?', this.downloadNewData, 'New Data Available', 'Yes,No');
      } else {
        navigator.notification.confirm('Sono disponibili nuovi dati, vuoi scaricarli ora?', this.downloadNewData, 'Dati Aggiornati', 'Si,No');
      }
    },
    downloadNewData: function(buttonIndex) {
      if (buttonIndex == 1) {
        // visualizza Spinner
        var target = document.getElementById('content');
        this.spinner.spin(target);
/*        var staticData = undefined; // qui ci va il caricamento del JSON
        if (localStorage.getItem("language") === "eng") {
          // TODO download English data
          $.getJSON('urlEnglish', function(response) {
            staticData = response;
          });
        } else { 
          // TODO download Italian data 
          $.getJSON('urlItalian', function(response) {
            staticData = response;
          });
        }*/
        this.updateDb(this.staticData, true);
      }
    },
    newDataAvailable: function() {
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
    },
    updateDb: function(data, eventi, clearDb) {
      var self = this;
      if(clearDb) {
        // cancello tutti i record delle tabelle
        db.transaction(function(tx) {
          tx.executeSql("DELETE FROM enti");
          tx.executeSql("DELETE FROM eventi");
          // tx.executeSql("DELETE FROM sponsors");
        }, function() {}, createData);
      } else {
        createData();
      }

      // data qui è accessibile dalla closure
      function createData() {

        // gli underscore li aggiungiamo direttamente nel datamanager quando carichiamo i vari eventi
        var tagClasses = {
          Giovani: "ad_giovani", 
          Pubblico_Generale: "ad_pubblicogenerale",
          Scuole_Medie: "ad_medie",
          Scuole_Elementari: "ad_elementari",
          Scuole_Superiori: "ad_superiori",
          Aperitivo_Scientifico: "ad_aperitivi",
          Giochi_Scientifici: "ad_giochiscientifici",
          Laboratorio: "ad_laboratori",
          Seminario: "ad_seminari",
          QR_code: "ad_qrcode"
        };

        var currentElement;
        self.frascatiscienza = data.frascatiscienza;
        self.imgfrascatiscienza = data.imgfrascatiscienza;
        localStorage.setItem("frascatiscienza" , self.frascatiscienza);
        localStorage.setItem("imgfrascatiscienza" , self.imgfrascatiscienza);
        localStorage.setItem("lastTimestamp", data.timestamp);
        for(var i=0; i<data.enti.length; i++) {
          currentElement = data.enti[i];
          currentElement.__id = currentElement.id;
          delete currentElement.id;
          self.enti.create(currentElement);
        }
        for(var i=0; i<eventi.eventi.length; i++) {
          currentElement = eventi.eventi[i];
          currentElement.__id = currentElement.id;
          for(var j=0; j < currentElement.tag.length; j++) {
            currentElement.tag[j] = tagClasses[currentElement.tag[j].replace(" ", "_")];
          }
          if(currentElement.macroevento == 193) {
            currentElement.nottericercatori = true;
          } else {
            currentElement.nottericercatori = false;
          }
          delete currentElement.id;
          self.eventi.create(currentElement);
        }
/*        for(var i=0; i<data.sponsors.length; i++) {
          currentElement = data.sponsors[i];
          currentElement.__id = currentElement.id;
          delete currentElement.id;
          self.sponsors.create(currentElement);
        }*/
      }
      setTimeout(function(){self.checkDataReady();},1000);

      // chiudi Spinner
      self.spinner.stop();
    }
  };

  _.extend(Data, Backbone.Events);
  return Data;

});
