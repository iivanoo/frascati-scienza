define(["jquery", "underscore", "backbone", "handlebars", "text!templates/test.html"],
    function ($, _, Backbone, Handlebars, template) {

    var TestView = Backbone.View.extend({

        initialize: function() {
            this.title = "testView";
          },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return TestView;

  });