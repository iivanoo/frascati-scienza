define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        initialize: function() {
            this.title = "Eventi";
          },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          for (var i = 0; i < this.model.length; i++) {
            $(this.el).append(new EventiListItemView({
              model: this.model.at(i)
            }).render().el);
          }
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
        }
      });

    return EventiListView;

  });