define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
	var Percorso = Backbone.Model.extend("Percorso", {

		defaults: {
			tappePercorsi: undefined
		},

		ciao: function() {
			console.log("cioa");
		}
	});

	return Percorso;

});