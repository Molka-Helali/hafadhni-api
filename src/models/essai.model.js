const mongoose = require('mongoose');
require('../configs/db.config');
// Define a Mongoose schema for the "example" entity
const essaiSchema = new mongoose.Schema({
    // Specific fields for example entity
    testDate: { type: Date },
    name: { type: String },
    score:[{
        result:{type:Number}
    }]
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const Essai = mongoose.model('Essai', essaiSchema);
// Export the Example model to make it accessible from other modules
module.exports = Essai;