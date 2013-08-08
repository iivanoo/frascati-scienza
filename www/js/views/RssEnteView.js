define(["jquery", "underscore", "backbone", "models/Ente", "models/Rss", "collections/RssList", "views/RssListItemView", "handlebars", "text!templates/rssente.html"],
    function ($, _, Backbone, Ente, Rss, RssList, RssListItemView, Handlebars, template) {

    var RssEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
            this.on("inTheDom", this.fetchNews);
          },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          var context = {};
          var contatti = this.model.get("contatti");
          if(contatti.immagine) {
            context.immagine = contatti.immagine;
          } else {
            if(contatti.video) {
              context.video = contatti.video;
            }
          }
          $(this.el).html(this.template(context));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
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

        fetchNews: function () {
          var news = new RssList();
          news.populate(this.model.get("rss"));
          var rssItemView;
          for (var i = 0; i < news.length; i++) {
            rssItemView = new RssListItemView({model: news.at(i)});
            $(".rss_wrapper").append(rssItemView.render().el);
          }
        }
      });

    return RssEnteView;

  });