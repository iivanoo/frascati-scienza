define(["jquery", "underscore", "backbone", "models/Sponsor", "handlebars", "text!templates/sponsorlistitem.html"],
    function ($, _, Backbone, Sponsor, Handlebars, template) {

    var SponsorListItemView = Backbone.View.extend({

        model: Sponsor,

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return SponsorListItemView;

  });