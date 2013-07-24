define(["jquery", "underscore", "backbone", "datamanager", "views/CoverView", "views/FrascatiScienzaView", "views/EntiListView", "views/SponsorListView", "views/AgendaView", "views/StructureView"],
    function ($, _, Backbone, Data, CoverView, FrascatiScienzaView, EntiListView, SponsorListView, AgendaView, StructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "cover",
        "frascatiscienza": "frascatiScienza",
        "enti": "enti",
        "sponsor": "sponsor",
        "agenda": "agenda",
        "eventi": "eventi",
        "caccia": "caccia"
      },

      initialize: function () {
        this.currentView = undefined;
      },

      cover: function () {
        if(localStorage.getItem("language")) {
          this.frascatiScienza();
        } else {
          var page = new CoverView();
          page.render();
          $("body").append($(page.el)); 
        }
      },

      enti: function () {
        var page = new EntiListView();
        this.changePage(page); 
      },

      sponsor: function () {
        var page = new SponsorListView();
        this.changePage(page); 
      },

      agenda: function () {
        var page = new AgendaView();
        this.changePage(page); 
      },

      eventi: function () {
        // TODO 
      },

      caccia: function () {
        // TODO
      },

      showStructure: function () {
        if(!this.structureView) {
          this.structureView = new StructureView();
          this.structureView.render();
        }
      },

      frascatiScienza: function () {
        if(!this.structureView) {
          $("#cover").remove();
          this.showStructure();
        }
        var page = new FrascatiScienzaView();
        this.changePage(page);
        if(!Data.newDataChecked && Data.newDataAvailable()) {
          Data.checkNewData();
        }
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
