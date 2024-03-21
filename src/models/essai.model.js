const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const essaiSchema = new mongoose.Schema({
    utilisateur: [{
        nom: { type: String },
        prenom: { type: String },
        motdepass: { type: String },
        mail: { type: String },
        telephone: { type: String }
    }],
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
    }]
});

const Essai = mongoose.model('Essai', essaiSchema);
module.exports = Essai;
