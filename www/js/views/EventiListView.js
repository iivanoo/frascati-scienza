define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        initialize: function() {
            this.title = "Eventi";
          },

        render: function () {
          // gestione nav bar
          document.getElementById("volatile").classList.add("nonvisibile");
          document.getElementById("legenda").classList.remove("nonvisibile");
          document.getElementById("ricerca").classList.remove("nonvisibile");
          // fine gestione nav bar
          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          for (var i = 0; i < this.model.length; i++) {
            $(this.el).append(new EventiListItemView({
              model: this.model.at(i)
            }).render().el);
          }
          return this;
        }
      });

    return EventiListView;

  });