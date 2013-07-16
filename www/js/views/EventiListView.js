define(["jquery", "underscore", "backbone", "collections/Eventi", "handlebars", "text!templates/entilist.html"],
    function ($, _, Backbone, Eventi, Handlebars, template) {

    var EntiListView = Backbone.View.extend({

        model: Eventi,

        initialize: function() {
            this.title = "Eventi";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return EntiListView;

  });