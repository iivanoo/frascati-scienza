define(["jquery", "underscore", "backbone", "models/Sponsor", "handlebars", "text!templates/sponsorlistitem.html"],
    function ($, _, Backbone, Sponsor, Handlebars, template) {

    var SponsorListItemView = Backbone.View.extend({

        model: Sponsor,

        tagName: "div",

        className: "row_wrapper",

        initialize: function() {
            //
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var sponsor = this.model.toJSON();
          sponsor.cid = this.model.get("__id");
          $(this.el).html(this.template(sponsor));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        }
      });

    return SponsorListItemView;

  });