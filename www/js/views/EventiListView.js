define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

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

        addEvents: function(day) {
          var notteWrapper =  $("#notte_wrapper");
          var altriWrapper =  $("#altri_wrapper");
          var wrapper;
          var a = this.model.search(1374410958, 1374410958);
          debugger;
          for (var i = 0; i < this.model.length; i++) {
            if(this.model.at(i).get("nottericercatori")) {
              wrapper = notteWrapper;
            } else {
              wrapper = altriWrapper;
            }
            wrapper.append(new EventiListItemView({
              model: this.model.at(i)
            }).render().el);
          }
        }
      });

    return EventiListView;

  });