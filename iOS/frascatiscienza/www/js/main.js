require.config({
  paths: {
    jquery: '../lib/jquery/jquery-1.9.1.min', //'../lib/jquery/zepto',
    underscore: '../lib/underscore/underscore-min',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    datamanager: 'datamanager',
    spin: '../lib/spin/spin'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    }
  }
});

var db = openDatabase("data", "1", "data", 2048*2048);

function ImgError(source){
  empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
  source.src = "data:image/png;base64," + empty1x1png;
  source.onerror = "";
  return true;
}

var isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
      };

// We launch the App
require(['underscore', 'backbone', 'spin', 'router', 'datamanager'],
    function (_, Backbone, Spinner, AppRouter, Data) {

      String.prototype.endsWith = function(suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      String.prototype.strip = function() {
          return this.replace(/(<([^>]+)>)/ig,"").replace(/(&lt;([^&gt;]+)&gt;)/ig,"");
      };

      document.addEventListener("deviceready", run, false);

      function run() {
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
          top: '150px', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        var spinner = new Spinner(opts);
        setTimeout(function(){spinner.spin(document.getElementsByTagName("body")[0]);}, 20);
        // TODO check in che ordine andiamo a prenderci i dati e quando facciamo le query nel DB locale
        Data.initialize();
        var router = new AppRouter();
/*
        if(!localStorage.getItem("dataLoaded")) {
          Data.loadLocalData();
        } else {
          Data.loadDbData();
        }*/
        Data.loadLocalData();
        // qui controlliamo se ci sono dati nuovi
/*        if(navigator.connection.type != Connection.NONE) {
          //if(!Data.newDataChecked && Data.newDataAvailable()) {
          //  Data.checkNewData();
          //}
          Data.loadLocalData();
        } else {
          Data.downloadNewData();
        }*/

        Data.on("dataReady", function() {
          spinner.stop();
          Backbone.history.start();
        });
      }
  });
