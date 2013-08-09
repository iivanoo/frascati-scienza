define(["jquery", "underscore", "backbone", "collections/Enti", "views/EntiListItemView", "datamanager", "handlebars"], function($, _, Backbone, Enti, EntiListItemView, Data, Handlebars) {

  var EntiListView = Backbone.View.extend({

    model: Enti,

    className: "defaultlist_wrapper",

    initialize: function() {
      this.title = "Enti";
    },

    render: function() {
      // gestione nav bar
      this.updateNavbar();

      $(this.el).empty();
      for (var i = 0; i < this.model.length; i++) {
        $(this.el).append(new EntiListItemView({
          model: this.model.at(i)
        }).render().el);
      }
      var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
      return this;
    },

    updateNavbar: function () {
      document.getElementById("volatile").classList.remove("nonvisibile");
      var functions = document.getElementsByClassName("button_list_element_small");
      for(var i=0; i< functions.length; i++) {
        functions[i].classList.add("nonvisibile");
      }
    }
  });

  return EntiListView;

});
