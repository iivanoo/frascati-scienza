define(["jquery", "underscore", "backbone", "models/Ente", "models/Rss", "collections/RssList", "handlebars", "text!templates/rssente.html"],
    function ($, _, Backbone, Ente, Rss, RssList, Handlebars, template) {

    var RssEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
          },

        template: Handlebars.compile(template),

        render: function () {
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

          // var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");

          return this;
        }
      });

    return RssEnteView;

  });