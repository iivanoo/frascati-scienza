define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/ente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var EnteView = Backbone.View.extend({

        model: Ente,

        events: {
          "touchend #ente_sx_top": "enteSxTop",
          "touchend #ente_sx_bottom": "enteSxBottom",
          "touchend #ente_dx_top": "enteDxTop",
          "touchend #ente_dx_bottom": "enteDxBottom",
          "touchend .eventi_ente": "eventi",
          "touchmove": "touchMove"
        },

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
            this.moving = false;
        },

        touchMove: function() {
          this.moving = true;
        },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "www") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "mappa") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "aggiungiAgenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },

        enteSxTop: function () {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var path = "sezioneEnte/chisiamo/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteSxBottom: function () {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var path = "sezioneEnte/contatti/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteDxTop: function () {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var path = "sezioneEnte/storia/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },
        enteDxBottom: function () {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var path = "sezioneEnte/miglioriamo/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },

        eventi: function () {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var path = "eventiEnte/" + this.model.get("__id");
          Backbone.history.navigate(path, {trigger: true});
        },

        addAgenda: function (event) {
          var agenda = JSON.parse(localStorage.getItem("agenda"));
          agenda.enti[this.model.get("__id")] = this.model.toJSON();
          localStorage.setItem("agenda", JSON.stringify(agenda));
          navigator.notification.alert('"' + this.model.get("titolo") + '" è stato salvato in agenda');
        }
      });

    return EnteView;

  });