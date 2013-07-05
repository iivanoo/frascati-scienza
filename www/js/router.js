define(["jquery", "underscore", "backbone", "views/TestView", "views/StructureView"],
    function ($, _, Backbone, TestView, StructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "structure",
        "frascatiscienza": "frascatiScienza"
      },

      initialize: function () {
        this.currentView = undefined;
      },

      structure: function () {
        if(!this.structureView) {
          this.structureView = new StructureView();
          this.structureView.render();
        }
        this.frascatiScienza();
      },

      frascatiScienza: function () {
        var page = new TestView();
        this.changePage(page);
      },

      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
        }
        this.currentView = page;
        page.render();
        this.structureView.$el.find("#content").append($(page.el));
        this.currentView.trigger("inTheDom");
        this.structureView.trigger("updateTitle", page);
      }

    });

    return AppRouter;

  });
