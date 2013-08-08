define(["jquery", "underscore", "backbone", "models/Sponsor", "handlebars", "models/EnteEvento", "text!templates/agendalistitem.html"],
    function ($, _, Backbone, Sponsor, Handlebars, EnteEvento, template) {

    var AgendaListItemView = Backbone.View.extend({

        model: EnteEvento,

        tagName: "div",

        className: "simple_element_row_agenda",

        initialize: function() {
          this.moving = false;
          this.touchEnded = false;
        },

        events: {
          "touchend": "goToDetail",
          "touchmove": "touchMove",
          "touchstart": "touchStart"
        },

        touchMove: function() {
          this.moving = true;
        },

        touchStart: function() {
/*          var self = this;
          setTimeout(function(){
            if(!self.touchEnded && !self.moving) {
              debugger;
            }
          }, 1000); */
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var agendaElement = this.model.toJSON();
          agendaElement.cid = this.model.get("__id");
          $(this.el).html(this.template(agendaElement));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        },

        goToDetail: function(event) {
          debugger;
          if(this.moving) {
            this.moving = false;
            return;
          } 
          this.touchEnded = true;
          if(this.model.get("eventi")) {
            // è un ente
            var path = "enti/" + event.target.id;
          } else {
            // è un evento
            var path = "eventi/" + event.target.id;
          }
          Backbone.history.navigate(path, {trigger: true});
        }
      });

    return AgendaListItemView;

  });