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

        initialize: function() {
          if(!this.title) {
            this.title = "Eventi";
          }
          var lastVisitedEventTimestamp = localStorage.getItem("lastVisitedEventTimestamp");
          if(lastVisitedEventTimestamp) {
            this.currentDay = this.getBaseTimestamp(lastVisitedEventTimestamp);
          } else {
            if(this.model.length > 0) {
              this.currentDay = this.getBaseTimestamp(this.model.at(0).get("timestamp"));
            } else {
              // 21 settembre 1:00
              this.currentDay = 1379725200;
            }
          }
          this.on("inTheDom", this.addEvents);
        },

        getBaseTimestamp: function(unix) {
          var date = new Date(unix * 1000);
          date.setHours(4);
          date.setMinutes(0);
          return date.getTime() / 1000;
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

          var dateName = document.getElementsByClassName("date")[0];
          var date = new Date(this.currentDay * 1000);
          var months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio',
'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre','dicembre'];
          dateName.innerHTML = date.getDate() + " " + months[date.getMonth()].toUpperCase();

          var filteredModel = this.model.search(this.currentDay, this.currentDay + 86400).toArray();
          for (var i = 0; i < filteredModel.length; i++) {
            if(!filteredModel[i].nottericercatori) {
              notteWrapper.append(new EventiListItemView({
                model: filteredModel[i]
              }).render().el);
          }
          }
          // popoliamo la lista degli altri eventi
          var otherEvents = this.model.where({nottericercatori: false});
          for(var i=0; i<otherEvents.length; i++) {
            var date = new Date(otherEvents[i].get("timestamp") * 1000);
            var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            otherEvents[i].set("date", dateString);
            altriWrapper.append(new EventiListItemView({
              model: otherEvents[i]
            }).render().el);
          }
        },

        dayBack: function(event) {
          this.currentDay = this.currentDay - 86400;
          this.addEvents();
        },

        dayNext: function(event) {
          this.currentDay = this.currentDay + 86400;
          this.addEvents();
        }
      });

    return EventiListView;

  });