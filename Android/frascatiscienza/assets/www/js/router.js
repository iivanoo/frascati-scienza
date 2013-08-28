define(["jquery", "underscore", "backbone", "datamanager", "collections/Eventi", "views/CoverView", "views/IntroNotteView", "views/FrascatiScienzaView", "views/EntiListView", "views/EnteView", "views/SezioneEnteView", "views/RssEnteView", "views/EventiListView", "views/EventoView", "views/SponsorListView", "views/AgendaView", "views/LegendaView", "views/CacciaView", "views/IntroCacciaView", "views/IntroTappaView", "views/DomandaCacciaView", "views/RisultatoCacciaView", "views/Mappa", "views/RicercaView", "views/StructureView"],
    function ($, _, Backbone, Data, Eventi, CoverView, IntroNotteView, FrascatiScienzaView, EntiListView, EnteView, SezioneEnteView, RssEnteView, EventiListView, EventoView, SponsorListView, AgendaView, LegendaView, CacciaView, IntroCacciaView, IntroTappaView, DomandaCacciaView, RisultatoCacciaView, MappaView, RicercaView, StructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "cover",
        "frascatiscienza": "frascatiScienza",
        "enti": "enti",
        "sponsor": "sponsor",
        "agenda": "agenda",
        "eventi": "eventi",
        "enti/:id": "enteDetails",
        "sezioneEnte/chisiamo/:id": "sezioneEnteChiSiamo",
        "sezioneEnte/storia/:id": "sezioneEnteStoria",
        "sezioneEnte/contatti/:id": "sezioneEnteContatti",
        "sezioneEnte/miglioriamo/:id": "sezioneEnteMiglioriamo",
        "eventi/:id": "eventoDetails",
        "eventiEnte/:id": "eventiEnte",
        "eventiCerca/:keyword/:tag/:organizzatore/:da/:a": "eventiCerca",
        "legenda": "legenda",
        "mappa": "mappa",
        "intronotte": "intronotte",
        "cerca": "cerca",
        "caccia": "caccia",
        "introcaccia": "introcaccia",
        "introtappa/:id": "introtappa",
        "domandacaccia/:id": "domandacaccia",
        "risultatocaccia/:id": "risultatocaccia"
      },

      initialize: function () {
        this.currentView = undefined;
      },

      cover: function () {
        // if(localStorage.getItem("language")) {
        //   this.frascatiScienza();
        // } else {
          var page = new CoverView();
          page.render();
          $("body").append($(page.el)); 
          $('#content_cover').css({
            'height': $(window).height() - 75
          });
        // }
      },

      enti: function () {
        var page = new EntiListView({model: Data.enti});
        this.changePage(page); 
      },

      sponsor: function () {
        var page = new SponsorListView({model: Data.sponsors});
        this.changePage(page); 
      },

      intronotte: function () {
        var page = new IntroNotteView();
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
        $('.default_wrapper').css({
            'height': $(window).height() - 88
        });
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
        var filteredEventi = Data.eventi.getByEnte(id).toArray();
        var page = new EventiListView({model: new Eventi(filteredEventi)});
        page.title = "Eventi " + Data.enti.findWhere({"__id": id}).get("titolo");
        this.changePage(page); 
      },

      eventiCerca: function (keyword, tag, organizzatore, da, a) {
        debugger;
        // TODO
        // filtra per data
        // filtra per tag
        // filtra per organizzatore
        // filtra per descrizione
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
        page.title = 'Risultati Ricerca';
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

      caccia: function () {
        var page = new CacciaView();
        this.changePage(page); 
      },

      introcaccia: function () {
        var page = new IntroCacciaView();
        this.changePage(page); 
        $("#backbutton").show();
        $(".button_list_element").show(); 
        $(".button_list_element_small").show();
      },

      introtappa: function (id) {
        var tappa = Data.getTappaById(id);
        if(tappa) {
          var tappaView = new IntroTappaView({
            model: tappa
          });
          this.changePage(tappaView); 
          $("#backbutton").hide();
          $(".button_list_element").hide(); 
          $(".button_list_element_small").hide();
        } else {
          navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
        }
      },

      domandacaccia: function (id) {
        var tappa = Data.getTappaById(id);
        var domandaView = new DomandaCacciaView({
          model: tappa
        });
        this.changePage(domandaView);
        $("#backbutton").hide();
        $(".button_list_element").hide(); 
        $(".button_list_element_small").hide();
      },

      risultatocaccia: function (id) {
        var tappa = Data.getTappaById(id);
        var risultatoView = new RisultatoCacciaView({
          model: tappa
        });
        this.changePage(risultatoView); 
        $("#backbutton").hide();
        $(".button_list_element").hide(); 
        $(".button_list_element_small").hide();
      },

      cerca: function () {
        var page = new RicercaView();
        this.changePage(page); 
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
      },

      changePage: function (page) {
        if((page instanceof CoverView)) {
          return;
        }
        if((page instanceof IntroTappaView) && !(this.currentView instanceof IntroCacciaView)) {
          return;
        }
        if((page instanceof DomandaCacciaView) && !(this.currentView instanceof IntroTappaView)) {
          return;
        }
        if((page instanceof RisultatoCacciaView) && !(this.currentView instanceof DomandaCacciaView)) {
          return;
        }
        var contentClasses = document.getElementById("content").classList;
        if((page instanceof EnteView)) {
          contentClasses.add("not_scrollable");
          contentClasses.remove("scrollable");
        } else {
          contentClasses.add("scrollable");
          contentClasses.remove("not_scrollable");
        }
        if((page instanceof FrascatiScienzaView)) {
          $("#backbutton").hide();
        } else {
          $("#backbutton").show();
        }
        if(this.currentView) {
          this.currentView.trigger("removed");
          this.currentView.remove(); 
        }
        this.currentView = page;
        this.structureView.currentView = page;
        page.render();
        this.structureView.$el.find("#content").append($(page.el));
        this.structureView.trigger("updateTitle", page);
        this.currentView.trigger("inTheDom");
      }

    });

    return AppRouter;

  });
