const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Roles } = require("../utils/enum/roles.enum");

const userSchema = new Schema({
  essai: [{
    type: Schema.Types.ObjectId,
    ref: 'Essai',
  }],
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.USER
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;



/*

{
  "userName": "JohnDoe",
  "password": "securepassword123",
  "mail": "johndoe@example.com",
  "phone": "1234567890"
}
*/ 