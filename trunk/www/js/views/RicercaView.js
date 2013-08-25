define(["jquery", "underscore", "backbone", "collections/Eventi", "datamanager", "handlebars", "text!templates/ricerca.html"],
    function ($, _, Backbone, Eventi, Data, Handlebars, template) {

    var RicercaView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend #ricerca_button": "cerca"
        }, 

        initialize: function() {
          var self = this;
          if(!this.title) {
            this.title = "Ricerca Eventi";
          }
          this.on("inTheDom", function() {
            /*var da = new Date();
            document.getElementById('da').value = da.format("dd/m/yyyy");
            var a = new Date();
            document.getElementById('a').value = a.format("dd/m/yyyy");*/
          });
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

        cerca: function(e) {
          alert("1");
          var keyword = document.getElementById("keyword").value;
          alert(keyword);
          var tag = document.getElementById("tag").value;
          alert(tag);
          var organizzatore = document.getElementById("organizzatore").value;
          alert(organizzatore);
          var da = document.getElementById("da").value;
          alert(da);
          var a = document.getElementById("a").value;
          alert(a);
          alert(keyword + tag + organizzatore + da + a);
          if((keyword + tag + organizzatore + da + a)) {
            Backbone.history.navigate("eventiCerca/" + keyword.strip(), {trigger: true});
          }
        }
      });

    return RicercaView;

  });