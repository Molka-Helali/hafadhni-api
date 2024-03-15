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
      await essai.findByIdAndUpdate(
        { _id: data._id },
        { $push: { score: data.score } },
      
      );
      // Attempting to find entities in the essai model based on the provided data
      return await essai.find(data);
    } catch (error) {
      // Throwing an error if there's an issue fetching entities
      throw new Error(`Error fetching entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customPhoto that takes in data as a parameter
  async customPhoto(data,_id) {
    try {
      await essai.findByIdAndUpdate(
         _id,
        { $push: { photo: data.photo } }
      );
      // Attempting to find entities in the essai model based on the provided data
      return await essai.find(data);
    } catch (error) {
      // Throwing an error if there's an issue fetching entities
      throw new Error(`Error fetching entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customText that takes in data as a parameter
  async customText(data) {
    try {
      await essai.findByIdAndUpdate(
        { _id: data._id },
        { $push: { Text: data.Text } }
      );
      // Attempting to find entities in the essai model based on the provided data
      return await essai.find(data);
    } catch (error) {
      // Throwing an error if there's an issue fetching entities
      throw new Error(`Error fetching entity by ID: ${error.message}`);
    }
  }
}

// Exporting the essaiService class to be used in other modules
module.exports = essaiService;