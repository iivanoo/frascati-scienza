define(["jquery", "underscore", "backbone", "datamanager", "views/CoverView", "views/FrascatiScienzaView", "views/EntiListView", "views/EnteView", "views/SezioneEnteView", "views/RssEnteView", "views/EventiListView", "views/EventoView", "views/SponsorListView", "views/AgendaView", "views/LegendaView", "views/StructureView"],
    function ($, _, Backbone, Data, CoverView, FrascatiScienzaView, EntiListView, EnteView, SezioneEnteView, RssEnteView, EventiListView, EventoView, SponsorListView, AgendaView, LegendaView, StructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "cover",
        "frascatiscienza": "frascatiScienza",
        "enti": "enti",
        "sponsor": "sponsor",
        "agenda": "agenda",
        "eventi": "eventi",
        "caccia": "caccia",
        "enti/:id": "enteDetails",
        "sezioneEnte/chisiamo/:id": "sezioneEnteChiSiamo",
        "sezioneEnte/storia/:id": "sezioneEnteStoria",
        "sezioneEnte/contatti/:id": "sezioneEnteContatti",
        "sezioneEnte/miglioriamo/:id": "sezioneEnteMiglioriamo",
        "eventi/:id": "eventoDetails",
        "legenda": "legenda"
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
          $('#content_cover').css({
            'height': $(window).height() - 75
          });
        }
      },

      enti: function () {
        var page = new EntiListView({model: Data.enti});
        this.changePage(page); 
      },

      sponsor: function () {
        var page = new SponsorListView({model: Data.sponsors});
        this.changePage(page); 
      },

      agenda: function () {
        var page = new AgendaView();
        this.changePage(page); 
      },

      enteDetails: function(id) {
        var ente = Data.enti.findWhere({"__id": id});
        var enteView = new EnteView({
          model: ente
        });
        this.changePage(enteView);
      },

      sezioneEnteChiSiamo: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "chisiamo");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      sezioneEnteStoria: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "storia");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      sezioneEnteContatti: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        var rssEnteView = new RssEnteView({
          model: ente
        });
        this.changePage(rssEnteView);
      },

      sezioneEnteMiglioriamo: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "miglioriamo");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      eventoDetails: function(id) {
        var evento = Data.eventi.findWhere({"__id": id});
        var eventoView = new EventoView({
          model: evento
        });
        this.changePage(eventoView);
      },

      eventi: function () {
        var elements = document.getElementsByClassName("button_list_element");
        for(var i=0; i<elements.length; i++) {
          if(elements[i].id == "eventi") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
              elements[i].classList.add("nonvisibile");
            } else {
              elements[i].classList.remove("nonvisibile");
            }
          }
        }
        var page = new EventiListView({model: Data.eventi});
        this.changePage(page); 
      },

      legenda: function () {
        var page = new LegendaView();
        this.changePage(page); 
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
        var frascatiModel =  Data.enti.findWhere({__id :"Frascati_Scienza"});
        if(frascatiModel) {
          frascatiModel.set("frascatiscienza", Data.frascatiscienza);
          frascatiModel.set("imgfrascatiscienza", Data.imgfrascatiscienza);
        }
        var page = new FrascatiScienzaView({model: frascatiModel});
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
        this.structureView.currentView = page;
        page.render();
        this.structureView.$el.find("#content").append($(page.el));
        this.currentView.trigger("inTheDom");
        this.structureView.trigger("updateTitle", page);
      }

    });

    return AppRouter;

  });
