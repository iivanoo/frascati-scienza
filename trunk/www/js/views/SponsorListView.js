define(["jquery", "underscore", "backbone", "collections/Sponsors", "handlebars", "text!templates/sponsorlist.html"],
    function ($, _, Backbone, Sponsors, Handlebars, template) {

    var SponsorView = Backbone.View.extend({

        model: Sponsors,

        initialize: function() {
            this.title = "Sponsor";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return SponsorView;

  });