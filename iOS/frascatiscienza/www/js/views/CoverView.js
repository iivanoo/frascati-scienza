define(["jquery", "underscore", "backbone", "handlebars", "text!templates/cover.html"],
    function ($, _, Backbone, Handlebars, template) {

    var CoverView = Backbone.View.extend({

        id: "cover", 

        events: {
          "touchend .language": "chooseLanguage"
        },

        chooseLanguage: function(event) {
          localStorage.setItem("language" , event.currentTarget.id);
          Backbone.history.navigate("frascatiscienza", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return CoverView;

  });