define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend .day_back": "dayBack",
          "touchend .day_next": "dayNext"
        }, 

        // 21 settembre 1:00
        currentDay: 1379725200,

        initialize: function() {
            this.title = "Eventi";
            this.on("inTheDom", this.addEvents);
          },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "legenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "ricerca") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },

        addEvents: function() {
          var notteWrapper =  $("#notte_wrapper").empty();
          var altriWrapper =  $("#altri_wrapper").empty();
          var wrapper;

          var filteredModel = this.model.search(this.currentDay, this.currentDay + 86400000).toArray();
          for (var i = 0; i < filteredModel.length; i++) {
            notteWrapper.append(new EventiListItemView({
              model: filteredModel[i]
            }).render().el);
          }
          // popoliamo la lista degli altri eventi
          var otherEvents = this.model.where({nottericercatori: false});
          for(var i=0; i<otherEvents.length; i++) {
            altriWrapper.append(new EventiListItemView({
              model: otherEvents[i]
            }).render().el);
          }
        },

        dayBack: function(event) {
          this.currentDay = this.currentDay - 86400000;
          this.addEvents();
        },

        dayNext: function(event) {
          this.currentDay = this.currentDay + 86400000;
          this.addEvents();
        },
      });

    return EventiListView;

  });