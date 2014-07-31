define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        events: {
          "tap .day_back": "dayBack",
          "tap .day_next": "dayNext"
        },

        initialize: function() {
          // in questo if ci si entra se si stanno visualizzando gli eventi direttamente, senza vedere quelli di uno specifico ente
          if(!this.title) {
            this.title = "Eventi";
          } 
          var lastVisitedEventTimestamp = localStorage.getItem("lastVisitedEventTimestamp");
          if(lastVisitedEventTimestamp) {
            this.currentDay = this.getBaseTimestamp(lastVisitedEventTimestamp);
          } else {
            // if(this.model.length > 0) {
            //   this.currentDay = this.getBaseTimestamp(this.model.at(0).get("timestamp"));
            // } else {
              // 21 settembre 1:00
              //this.currentDay = 1379725200;
              // il current day adesso è la data di oggi

              var today = new Date().getTime() / 1000;
              // qui ci si entra se NON si stanno visualizzando gli eventi di un ente specifico 
              if(this.attributes["data-filtered"] && (this.model.length > 0)) {
                var filtrati = this.model.searchFrom(today);
                // qui ci mettiamo il primo evento tra quelli futuri dell'ente, se non ci sono allora ci mettiamo l'ultimo evento organizzato
                if(filtrati.length > 0) {
                  this.currentDay = this.getBaseTimestamp(filtrati.at(0).get("timestamp"));
                } else {
                  this.currentDay = this.getBaseTimestamp(this.model.at(this.model.length - 1).get("timestamp"));
                }
              } else {
                this.currentDay = this.getBaseTimestamp(today);
              }
            // }
          }
          this.subviews = [];
          this.on("inTheDom", this.addEvents);
          this.on("removed", this.removed);
        },

        removed: function() {
          for(var i=0; i<this.subviews.length; i++) {
            this.subviews[i].remove();
          }
        },

        getBaseTimestamp: function(unix) {
          var date = new Date(unix * 1000);
          date.setHours(1);
          date.setMinutes(0);
          return date.getTime() / 1000;
        },

        getUpperTimestamp: function(unix) {
          var date = new Date(unix * 1000);
          date.setHours(23);
          date.setMinutes(59);
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

        addEvents: function(movingBack) {
          var notteWrapper =  $("#notte_wrapper").empty();
          var altriWrapper =  $("#altri_wrapper").empty();
          var wrapper;

          var dateName = document.getElementsByClassName("date")[0];
          var date = new Date(this.currentDay * 1000);
          var months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio',
'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre','dicembre'];
          dateName.innerHTML = date.getDate() + " " + months[date.getMonth()].toUpperCase() + " " + date.getFullYear();

          // cerchiamo tutti gli eventi nel giorno attuale (currentDay)
          var filteredModel = _.filter(this.model.search(this.currentDay, this.currentDay + 86400).toArray(), function(el) {
            if(el.isNotte) {
              return el.isNotte();
            } else {
              return false;
            }
          });
          for (var i = 0; i < filteredModel.length; i++) {
            var item = new EventiListItemView({
              model: filteredModel[i]
            });
            notteWrapper.append(item.render().el);
            this.subviews.push(item);
          }
          // popoliamo la lista degli altri eventi
          //var otherEvents = this.model.search(this.currentDay, this.currentDay + 86400).toArray().where({nottericercatori: false});
          var otherEvents = _.filter(this.model.search(this.currentDay, this.currentDay + 86400).toArray(), function(el) {
            if(el.isNotte) {
              return !el.isNotte();
            } else {
              return false;
            }
          });
          for(var i=0; i<otherEvents.length; i++) {
            var date = new Date(otherEvents[i].get("timestamp") * 1000);
            var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            otherEvents[i].set("date", dateString);
            var item = new EventiListItemView({
              model: otherEvents[i]
            });
            altriWrapper.append(item.render().el);
            this.subviews.push(item);
          }
          if((filteredModel.length == 0) && (otherEvents.length == 0)) {
            //navigator.notification.alert('Questa lista degli eventi è purtroppo vuota.', function() {}, "Attenzione");
            // TODO controllare qui, non si può fare dayNext, perchè non possiamo sapere se stiamo andando avanti e indietro
            // soprattutto da controllare cosa fare quando qui ci si arriva già premendo daynext o dayback.
            // controllare perchè filteredModel e otherEvents sono vuoti quando si fa dayback() e daynext()
            if(movingBack) {
              this.dayBack();
            } else {
              this.dayNext();
            }
            
          }
        },

        dayBack: function(event) {
          var yesterday = this.currentDay - 86400;
          var pastEvents = this.model.searchTo(this.getUpperTimestamp(yesterday)).toArray();
          if(pastEvents.length != 0) {
            //this.currentDay = yesterday;
            this.currentDay = this.getBaseTimestamp(pastEvents[pastEvents.length - 1].get("timestamp"));
            this.addEvents(true);
          } else {
            navigator.notification.alert('Non ci sono eventi programmati precedenti a quello corrente.', function() {}, "Attenzione");
          }          
        },

        dayNext: function(event) {
          var tomorrow = this.currentDay + 86400;
          var nextEvents = this.model.searchFrom(tomorrow).toArray();
          if(nextEvents.length != 0) {
            //this.currentDay = tomorrow;
            this.currentDay = this.getBaseTimestamp(nextEvents[0].get("timestamp"));
            this.addEvents(false);
          } else {
            navigator.notification.alert('Non ci sono eventi programmati successivi a quello corrente.', function() {}, "Attenzione");
          } 
        }
      });

    return EventiListView;

  });