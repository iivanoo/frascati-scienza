define(["jquery", "underscore", "backbone", "collections/Sponsors", "views/SponsorListItemView", "handlebars", "text!templates/sponsorlist.html"],
    function ($, _, Backbone, Sponsors, SponsorListItemView, Handlebars, template) {

    var SponsorView = Backbone.View.extend({

        model: Sponsors,

        className: "defaultlist_wrapper",

        initialize: function() {
            this.title = "Sponsor";
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          for (var i = 0; i < this.model.length; i++) {
            $(this.el).append(new SponsorListItemView({
              model: this.model.at(i)
            }).render().el);
          }
          return this;
        }
      });

    return SponsorView;

  });