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