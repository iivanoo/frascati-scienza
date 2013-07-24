define(["jquery", "underscore", "backbone", "models/Ente", "models/Evento", "models/Sponsor", "collections/Enti", "collections/Eventi", "collections/Sponsors", "staticdata"], function($, _, Backbone, Ente, Evento, Sponsor, Enti, Eventi, Sponsors) {

  var Data = {
    enti: new Enti,
    eventi: new Eventi,
    sponsors: new Sponsors,
    newDataChecked: false,
    initialize: function() {
      this.enti.on('reset', this.checkDataReady, this);
      this.eventi.on('reset', this.checkDataReady, this);
      this.sponsors.on('reset', this.checkDataReady, this);
      this.enti.fetch({reset: true});
      this.eventi.fetch({reset: true});
      this.sponsors.fetch({reset: true});
    },
    checkDataReady: function() {
      if((this.enti.length > 0) && (this.eventi.length > 0) && (this.sponsors.length > 0)) {
        // quando scateno questo evento, allora ho fatto il fetch di tutti i dati
        //this.trigger("dataReady");
      }
    },
    loadLocalData: function() {
      var staticData = require("staticdata");
      this.updateDb(staticData, false);
      localStorage.setItem("dataLoaded" , "yes");
    },
    checkNewData: function() {
      newDataChecked = true;
      if (localStorage.getItem("language") === "eng") {
        navigator.notification.confirm('New data available, do you want to update it?', downloadNewData, 'New Data Available', 'Yes,No');
      } else {
        navigator.notification.confirm('Sono disponibili nuovi dati, vuoi scaricarli ora?', downloadNewData, 'Dati Aggiornati', 'Si,No');
      }
    },
    downloadNewData: function(buttonIndex) {
      if (buttonIndex == 1) {
        var staticData = undefined; // qui ci andrebbe il caricamento del JSON
        if (localStorage.getItem("language") === "eng") {
          // TODO download English data e
          $.getJSON('urlEnglish', function(response) {
            staticData = response;
          });
        } else { 
          // TODO download Italian data 
          var staticData = undefined; // qui ci andrebbe il caricamento del JSON
          $.getJSON('urlItalian', function(response) {
            staticData = response;
          });
        }
        this.updateDb(staticData, true);
      }
    },
    newDataAvailable: function() {
      var result = false;
      if (localStorage.getItem("language") === "eng") {
        // TODO check English data available
      } else {
        // TODO check Italian data available
      }
      return result;
    },
    updateDb: function(data, clearDb) {
      if(clearDb) {
        // TODO cancellare tutti i record delle tabelle
        // DELETE FROM table_name;
      }
      var currentElement;
      for(var i=0; i<data.enti.length; i++) {
        currentElement = data.enti[i];
        currentElement.__id = currentElement.id;
        delete currentElement.id;
        this.enti.create(currentElement);
      }
      for(var i=0; i<data.eventi.length; i++) {
        currentElement = data.eventi[i];
        currentElement.__id = currentElement.id;
        delete currentElement.id;
        this.eventi.create(currentElement);
      }
      for(var i=0; i<data.sponsors.length; i++) {
        currentElement = data.sponsors[i];
        currentElement.__id = currentElement.id;
        delete currentElement.id;
        this.sponsors.create(currentElement);
      }
    }
  };

  return Data;

});
