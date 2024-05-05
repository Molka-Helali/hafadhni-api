const mongoose = require('mongoose');

const essaiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  testDate: { type: Date },
  name: { type: String },
  score: [{
    dateTime: { type: Date },
    percentage: { type: Number },
    mention: { type: String }
  }],
  photo: [{
    name:{type:String}
}],
  text: [{
    content: { type: String },
  }],
  translation: [{
    translationName: { type: String },
  }],
  summaryText: [{ 
    text: { type: String }, 
  }],
});

const Essai = mongoose.model('Essai', essaiSchema);

module.exports = Essai;


