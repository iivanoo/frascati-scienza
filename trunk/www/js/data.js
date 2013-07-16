var data = {
  timestamp: "timestamp (in formato Unix) di quando è stato creato questo file JSON"
  frascatiscienza: "testo descrittivo di Frascati Scienza",
  imgfrascatiscienza: "http://url",
  enti: [{ // è una lista di elementi, qui ne ho messo uno solo per brevità
    id: "id univoco",
    titolo: "nome_ente",
    descrizione: "testo descrizione ente",
    logo: "http://url",
    sito: "http://url",
    eventi: ["id_evento_a", "id_evento_b", "id_evento_c"],
    chisiamo: {testo: "", immagine: "http://url"},
    storia: {testo: "", immagine: "http://url"},
    miglioriamo: {testo: "", immagine: "http://url"},
    contatti: {immagine: "http://url"},
    rss: "url_feed_rss",
    luogo: {lat: "", lon: ""}
  }],
  eventi: [{ // è una lista di elementi, qui ne ho messo uno solo per brevità
    id: "id univoco",
    titolo: "titolo_evento",
    timestamp: "data evento (in formato Unix)",
    descrizione: "testo descrizione evento",
    immagine: "http://url",
    video: "http://url",
    nottericercatori: true, // vale true se l'evento fa parte del programma della Notte dei Ricercatori, false altrimenti
    tag: ["Tutti", "QR", "astronomia"], // lista dei tag dell'evento (vedi Legenda in Storyboard)
    ente: "id_ente",
    luogo: {lat: "", lon: ""}
  }],
  sponsors: [{ // è una lista di elementi, qui ne ho messo uno solo per brevità
    id: "id univoco",
    nome: "nome_sponsor",
    descrizione: "testo descrizione evento",
    immagine: "http://url",
    sito: "http://url",
    luogo: {lat: "", lon: ""}
  }],
  caccia: {
    introduzione: "testo intro",
    tappe: [{ // è una lista di tappe, qui ne ho messo una solo per brevità
      id: "id univoco tappa",
      nome: "nome_sponsor",
      introduzione: "testo descrizione evento",
      immagine: "http://url",
      domande: ["testo domanda 1", "testo domanda 2", "testo domanda 3", "testo domanda 4"],
      indicedomandagiusta: 1, // indice della domanda giusta nella lista domande
      feedback: "testo del feedback"
      }
    }]
  }
};