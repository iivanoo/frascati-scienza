define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/eventilistitem.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EventiListItemView = Backbone.View.extend({

        model: Evento,

        tagName: "div",

        className: "event_row_wrapper",

        events: {
          "touchend": "goToEvento"
        },

        initialize: function() {
            //
          },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var evento = this.model.toJSON();
          evento.cid = this.model.get("__id");
          evento.time = this.convertDate(this.model.get("timestamp"));
          $(this.el).html(this.template(evento));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        },

        goToEvento: function() {
          var path = "eventi/" + this.model.cid;
          Backbone.history.navigate(path, {trigger: true});
        },

        convertDate: function(unix) {
          var date = new Date(unix * 1000);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          return (hours + ':' + minutes);
        }
      });

    return EventiListItemView;

  });