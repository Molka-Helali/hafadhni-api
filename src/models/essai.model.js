const { required } = require('joi');
const mongoose = require('mongoose');

const essaiSchema = new mongoose.Schema({
  userId: {
      type : String
  },
  testDate: { type: Date },
  name: { type: String },
  score: [{
    dateTime: { type: Date },
    percentage: { type: Number },
    mention: { type: String }
  }],
  images: [{
    name: { type: String } // Assuming 'name' is the filename of the image
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


