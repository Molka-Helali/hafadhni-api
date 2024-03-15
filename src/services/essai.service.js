// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the essai model from "../models/essai.model"
const essai = require("../models/essai.model");

// Defining a new class essaiService which extends BaseService
class essaiService extends BaseService {
  constructor() {
    // Calling the constructor of the parent class (BaseService) and passing the essai model
    super(essai);
  }

  // Defining a custom method called custom that takes in data as a parameter
  async custom(data) {
    try {
      // Updating the essai model by pushing the score data to the specified entity
      return await essai.findByIdAndUpdate(
        { _id: data._id },
        { $push: { score: data.score } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customPhoto that takes in data and _id as parameters
  async customPhoto(data, _id) {
    try {
      // Updating the essai model by pushing the photo data to the specified entity
      return await essai.findByIdAndUpdate(
        { _id: data._id },
        { $push: { photo: data.photo } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customText that takes in data as a parameter
  async customText(data) {
    try {
      // Updating the essai model by pushing the Text data to the specified entity
      return await essai.findByIdAndUpdate(
        { _id: data._id },
        { $push: { Text: data.Text } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }
}

// Exporting the essaiService class to be used in other modules
module.exports = essaiService;
