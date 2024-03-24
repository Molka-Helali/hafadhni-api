const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String }

});

// Create the User model using the schema
const user = mongoose.model('User', userSchema);


// Export the User model to be used in other parts of the application
module.exports = user;
/*

{
  "userName": "JohnDoe",
  "password": "securepassword123",
  "mail": "johndoe@example.com",
  "phone": "1234567890"
}
*/ 