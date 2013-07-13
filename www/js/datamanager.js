define(["jquery", "underscore", "backbone", "models/Ente", "models/Evento", "models/Sponsor", "collections/Enti", "collections/Eventi", "collections/Sponsors"], function($, _, Backbone, Ente, Evento, Sponsor, Enti, Eventi, Sponsors) {

  var Data = {
    // qui ci mettiamo il contenuto statico del JSON
    data: {},
    newDataChecked: false,
    loadLocalData: function() {
      // carichiamo i contenuti del JSON
      debugger;
      localStorage.setItem("dataLoaded" , "yes");
    },
    checkNewData: function() {
      newDataChecked = true;
      var confirmationText = 'Si,No';
      if (localStorage.getItem("language") === "eng") {
        confirmationText = 'Yes,No';
      }
      navigator.notification.confirm('Sono disponibili nuovi dati, vuoi scaricarli ora?', downloadNewData, 'Dati Aggiornati', confirmationText);
    },
    downloadNewData: function(buttonIndex) {
      if (buttonIndex == 1) {
        if (localStorage.getItem("language") === "eng") {
          // TODO download English data
        } else {
          // TODO download Italian data 
        }
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
    }
  };

  return Data;

});
