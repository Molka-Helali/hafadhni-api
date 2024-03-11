const mongoose = require('mongoose');
// Define a Mongoose schema for the "example" entity
const exampleSchema = new mongoose.Schema({
    // Specific fields for example entity
    name: {
        type: String
    },
    description: String,
    price: {
        type: Number
    },
    images: [{ type: String }],
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const Example = mongoose.model('Example', exampleSchema);
// Export the Example model to make it accessible from other modules
module.exports = Example;