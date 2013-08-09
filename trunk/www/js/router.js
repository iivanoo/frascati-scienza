define(["jquery", "underscore", "backbone", "datamanager", "collections/Eventi", "views/CoverView", "views/FrascatiScienzaView", "views/EntiListView", "views/EnteView", "views/SezioneEnteView", "views/RssEnteView", "views/EventiListView", "views/EventoView", "views/SponsorListView", "views/AgendaView", "views/LegendaView", "views/Mappa", "views/StructureView"],
    function ($, _, Backbone, Data, Eventi, CoverView, FrascatiScienzaView, EntiListView, EnteView, SezioneEnteView, RssEnteView, EventiListView, EventoView, SponsorListView, AgendaView, LegendaView, MappaView, StructureView) {

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
        "eventiEnte/:id": "eventiEnte",
        "eventiCerca/:keyword": "eventiCerca",
        "legenda": "legenda",
        "mappa": "mappa",
        "mappaSponsor/:id": "mappaSponsor"
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

      eventiEnte: function (id) {
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
        debugger;
        var filteredEventi = Data.eventi.getByEnte(id).toArray();
        var page = new EventiListView({model: new Eventi(filteredEventi)});
        page.title = "Eventi " + Data.enti.findWhere({"__id": id}).get("titolo");
        this.changePage(page); 
      },

      eventiCerca: function (keyword) {
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
        var filteredEventi = Data.eventi.getByKeyword(keyword).toArray();
        var page = new EventiListView({model: new Eventi(filteredEventi)});
        page.title = '"'  + keyword + '"';
        this.changePage(page); 
      },

      legenda: function () {
        var page = new LegendaView();
        this.changePage(page); 
      },

      mappa: function () {
        var page = new MappaView({
          model: this.currentView.model
        });
        this.changePage(page); 
      },

      mappaSponsor: function (id) {
        var sponsor = Data.sponsors.findWhere({"__id": id});
        var page = new MappaView({
          model: sponsor
        });
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
        var frascatiModel =  Data.enti.findWhere({__id :"frascati-scienza"});
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
        var contentClasses = document.getElementById("content").classList;
        if((page instanceof EnteView) || (page instanceof FrascatiScienzaView)) {
          contentClasses.add("not_scrollable");
          contentClasses.remove("scrollable");
        } else {
          contentClasses.add("scrollable");
          contentClasses.remove("not_scrollable");
        }
        if(Backbone.history.history.length < 2) {
          $("#backbutton").hide();
        } else {
          $("#backbutton").show();
        }
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
