define(["jquery", "underscore", "backbone", "collections/Enti", "views/EntiListItemView", "datamanager", "handlebars"], function($, _, Backbone, Enti, EntiListItemView, Data, Handlebars) {

  var EntiListView = Backbone.View.extend({

    model: Enti,

    className: "defaultlist_wrapper",

    initialize: function() {
      this.title = "Enti";
      this.subviews = [];
      this.on("removed", this.removed);
    },

    render: function() {
      // gestione nav bar
      this.updateNavbar();

      $(this.el).empty();
      for (var i = 0; i < this.model.length; i++) {
        var item = new EntiListItemView({
          model: this.model.at(i)
        });
        $(this.el).append(item.render().el);
        this.subviews.push(item);
      }
      var el = $("#titlebar");
      el.removeClass();
      el.addClass("frascatiscienze_top");
      return this;
    },

    removed: function() {
      for(var i=0; i<this.subviews.length; i++) {
        this.subviews[i].remove();
      }
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
