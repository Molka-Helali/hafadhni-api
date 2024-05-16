// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the Essai model from "../models/essai.model"
const Essai = require("../models/essai.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const { date } = require("joi");

// Defining a new class EssaiService which extends BaseService
class EssaiService extends BaseService {
  constructor() {
    // Calling the constructor of the parent class (BaseService) and passing the Essai model
    super(Essai);
  }

  // Defining a custom method called custom that takes in data as a parameter
  async custom(data) {
    try {
      // Updating the Essai model by pushing the score data to the specified entity
      return await this.model.findByIdAndUpdate(
        data._id,
        { $push: { score: data.score } },
        { new: true } // Return the updated document
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called customPhoto that takes in data as a parameter
  async customPhoto(data) {
    try {
      const { _id, photo } = data;

      // Check if the document exists
      const existingDocument = await this.model.findById(_id);
      if (!existingDocument) {
        throw new Error('Document not found.');
      }

      // Validate photo data structure
      if (!photo || !Array.isArray(photo)) {
        throw new Error('Invalid photo data format.');
      }

      // Extract photo names from the data and push to the existing photo array
      const photoNames = photo.map(item => ({ name: item.name }));
      existingDocument.photo.push(...photoNames);

      // Save the updated document
      return await existingDocument.save();
    } catch (error) {
      throw new Error(`Error adding essai photo: ${error.message}`);
    }
  }

  // Defining a custom method called Text that takes in data as a parameter
  async Text(data) {
    try {
      // Updating the Essai model by pushing the Text data to the specified entity
      return await this.model.findByIdAndUpdate(
        data._id,
        { $push: { text: data.text } },
        { new: true } // Return the updated document
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called translation that takes in data as a parameter
  async translation(data) {
    try {
      // Updating the Essai model by pushing the translation data to the specified entity
      return await this.model.findByIdAndUpdate(
        data._id,
        { $push: { translation: data.translation } },
        { new: true } // Return the updated document
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

  // Defining a custom method called summaryText that takes in data as a parameter
  async summaryText(data) {
    try {
      // Updating the Essai model by pushing the summaryText data to the specified entity
      return await this.model.findByIdAndUpdate(
        data._id,
        { $push: { summaryText: data.summaryText } },
        { new: true } // Return the updated document
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }
}

module.exports = EssaiService;
