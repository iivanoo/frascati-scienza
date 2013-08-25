define(["jquery", "underscore", "backbone", "handlebars", "datamanager", "text!templates/cover.html"],
    function ($, _, Backbone, Handlebars, Data, template) {

    var CoverView = Backbone.View.extend({

        id: "cover", 

        events: {
          "touchend .language": "chooseLanguage"
        },

        initialize: function () {
          this.body = document.getElementsByTagName("body")[0]
        },

        chooseLanguage: function(event) {
          var self = this;
          setTimeout(function(){
            Data.spinner.spin(self.body);
          }, 20);         
          Data.on("dataReady", function() {
            Data.spinner.stop();
            // Backbone.history.start();
            Backbone.history.navigate("frascatiscienza", {trigger: true});
          });
          localStorage.setItem("language" , event.currentTarget.id);
          setTimeout(function(){
            Data.startupData();
          }, 100);         
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return CoverView;

  });