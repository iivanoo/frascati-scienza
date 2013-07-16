define(["jquery", "underscore", "backbone", "collections/Enti", "handlebars", "text!templates/entilist.html"],
    function ($, _, Backbone, Enti, Handlebars, template) {

    var EntiListView = Backbone.View.extend({

        model: Enti,

        initialize: function() {
            this.title = "Enti";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return EntiListView;

  });