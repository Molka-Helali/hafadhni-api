const mongoose = require('mongoose');
const essaiSchema = new mongoose.Schema({
    testDate: { type: Date },
    name: { type: String },
    score: [{
        dateTime: { type: Date },
        pourcentage: { type: Number }, // Corrected spelling of "pourcentage"
        mention: { type: String }
    }],
    photo: [{
        donnees: { type: String }, // Corrected spelling of "donnees"
        path: { type: String },
        taille: { type: Number },
    }],
    text: [{
        contenu: { type: String },
    }],
});

const Essai = mongoose.model('Essai', essaiSchema);
module.exports = Essai;
