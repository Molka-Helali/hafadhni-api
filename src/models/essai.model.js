const mongoose = require('mongoose');
require('../configs/db.config');
// Define a Mongoose schema for the "example" entity
const essaiSchema = new mongoose.Schema({
    // Specific fields for example entity
    utilisateur: [{
        nom: { type: String },
        prenom: { type: String },
        motdepass: { type: String },
        mail: { type: String },
        telephone: { type: String }
    }],
    testDate: { type: Date },
    name: { type: String },
    score:[{
        dateTime: { type: Date },
        Poursantage: { type: Number },
        mention: { type: String }
    }],
    photo:[{
        données: { type: String },
        path: { type: String },
        taille: { type: Number },
   }],
   text :[{
    contenu: { type: String },
    }]
   
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const Essai = mongoose.model('Essai', essaiSchema);
// Export the Example model to make it accessible from other modules
module.exports = Essai;



/*
{
  "score": [
    {
      "dateTime": "2024-03-16", 
      "Poursantage": 85,
      "mention": "Bien"
    }
  ],
  "photo": [
    {
      "donnees": "Données de l'image ", 
      "path": "/chemin/vers/l/image.jpg", 
      "taille": 1024 
    }
  ],
  "text": [
    {
      "contenu": "Contenu du texte" 
    }
  ]
}

*/