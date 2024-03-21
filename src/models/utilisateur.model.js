/*const bcrypt = require('bcrypt/promises'); // Import bcrypt for password hashing
const mongoose = require('mongoose');
const { findOne } = require('./essai.model');
require('../configs/db.config');

// Define a Mongoose schema for the "utilisateur" entity
const utilisateurSchema = new mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    motdepass: { type: String },
    mail: { type: String },
    telephone: { type: String }
    // You can add more fields specific to users here
});

// Create a Mongoose model named "Utilisateur" based on the defined schema
const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Export the register function to make it accessible from other modules
exports.register = async (nom, prenom, motdepass, mail, telephone) => {
    try {
        // Check if the email already exists in the database
        const existingUser = await findOne({ mail });
        if (existingUser) {
            throw new Error('This email is already registered.');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(motdepass, 10); // 10 is the salt rounds

        // Create a new user document
        const newUser = new Utilisateur({
            nom,
            prenom,
            motdepass: hashedPassword,
            mail,
            telephone
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error(error.message); // Throw the specific error message
    }
};

// Example usage:
// exports.register('John', 'Doe', 'password123', 'john.doe@example.com', '123456789');
*/