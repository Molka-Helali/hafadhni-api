// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the essai model from "../models/essai.model"
const Essai = require("../models/essai.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
// Defining a new class EssaiService which extends BaseService
class EssaiService extends BaseService {
  constructor() {
    // Calling the constructor of the parent class (BaseService) and passing the Essai model
    super(Essai);
    this.your_secret_key = 'my secret keyy hhjqdsjdqkmdfhf';
  }

  // Defining a custom method called custom that takes in data as a parameter
  async custom(data) {
    try {
      // Updating the Essai model by pushing the score data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { score: data.score } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customPhoto that takes in data and _id as parameters
  async customPhoto(data) {
    try {
      // Updating the Essai model by pushing the photo data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { photo: data.photo } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customText that takes in data as a parameter
  async Text(data) {
    try {
      // Updating the Essai model by pushing the Text data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { text: data.text } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called utilisateur that takes in data as a parameter
  async utilisateur(data) {
    try {
      // Hashing the password using bcrypt
      const hashedPassword = await bcrypt.hash(data.utilisateur[0].motdepass, 10);
      // Updating the password in the data with the hashed password
      data.utilisateur[0].motdepass = hashedPassword;
      // Updating the user in the database by adding the new user data
      return await this.model.findByIdAndUpdate(data._id, { $push: { utilisateur: data.utilisateur[0] } });
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  async loginUser(data) {
    try {
      const foundUser = await this.model.findOne({ mail: data.mail });
      if (!foundUser) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(data.motdepass, foundUser.motdepass);
      if (!passwordMatch) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ userId: foundUser._id }, 'your_secret_key', { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}
module.exports = EssaiService;
/*
  const loginuser = async (req, res, next) => {
  console.log(req.body);
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });

    if (foundUser) {
      const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);
  */
// Exporting the EssaiService class to be used in other modules