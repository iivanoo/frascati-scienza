define(["jquery", "underscore", "backbone", "models/Rss"],
    function ($, _, Backbone, Rss) {

    var RssList = Backbone.Collection.extend({
        model: Rss,
        populate: function (feedUrl) {
        	var xmlhttp = new XMLHttpRequest();
        	xmlhttp.open("GET",feedUrl,false);
			xmlhttp.send();
			var feed =xmlhttp.responseXML;
			var news = feed.getElementsByTagName("item");
			var title, description, link;
			for(var i=0; i<news.length; i++) {
				title = news[i].getElementsByTagName("title")[0].textContent.replace(/(<([^>]+)>)/ig,"");
				description = news[i].getElementsByTagName("description")[0].textContent.replace(/(<([^>]+)>)/ig,"");
				link = news[i].getElementsByTagName("link")[0].textContent.replace(/(<([^>]+)>)/ig,"");
				this.create({title: title, description: description, link: link});
			}
        }
      });

    return RssList;

  });