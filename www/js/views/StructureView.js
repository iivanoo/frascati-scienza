define(["jquery", "underscore", "backbone", "handlebars", "text!templates/structure.html"],
    function ($, _, Backbone, Handlebars, template) {

    var StructureView = Backbone.View.extend({

        id: "mainContainer", 

        events: {
          "touchend #backbutton": "goBack"
        },

        initialize: function() {
          this.on("updateTitle", this.updateTitle);
        },

        goBack: function () {
          window.history.back();
        },

        updateTitle: function (page) {
          document.getElementById("title").innerHTML = page.title;
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          this.title = "Test";
          $(this.el).html(this.template({}));
          $('body').append($(this.el));
          return this;
        }
      });

    return StructureView;

  }); 