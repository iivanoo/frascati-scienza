require.config({
  paths: {
    jquery: '../lib/jquery/zepto',
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

// We launch the App
require(['underscore', 'backbone', 'router', 'datamanager'],
    function (_, Backbone, AppRouter, Data) {

      String.prototype.endsWith = function(suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      document.addEventListener("deviceready", run, false);

      function run() {
        // TODO check in che ordine andiamo a prenderci i dati e quando facciamo le query nel DB locale
        Data.initialize();
        var router = new AppRouter();
/*        if(!localStorage.getItem("dataLoaded")) {
          Data.loadLocalData();
        } else {
          Data.loadDbData();
        }*/

        Data.loadLocalData();
        Data.on("dataReady", function() {
          Backbone.history.start();
        });
      }
  });
