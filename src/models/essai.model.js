const mongoose = require('mongoose');
require('../configs/db.config');
// Define a Mongoose schema for the "example" entity
const essaiSchema = new mongoose.Schema({ 
    // Specific fields for example entity
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
    }],

    // You can add more fields specific to products here
});
// Create a Mongoose model named "Essai" based on the defined schema
const Essai = mongoose.model('Essai', essaiSchema);
// Export the Example model to make it accessible from other modules
module.exports = Essai;