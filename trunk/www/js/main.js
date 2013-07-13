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
    datamanager: 'datamanager'
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

var db = openDatabase("data", "", "data", 2048*2048);

// We launch the App
require(['underscore', 'backbone', 'router', 'datamanager'],
    function (_, Backbone, AppRouter, Data) {
      document.addEventListener("deviceready", run, false);
      function run() {
        if(!localStorage.getItem("dataLoaded")) {
          Data.loadLocalData();
        }
        new AppRouter();
        Backbone.history.start();
      }
  });
