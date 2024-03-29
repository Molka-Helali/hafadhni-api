// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the essai model from "../models/essai.model"
const Essai = require("../models/essai.model");
const user = require("../models/user.model");
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

  async user(data) {
    try {
      // Updating the essai model by pushing the Text data to the specified entity
      return await  this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { user: data.user } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }

 //@desc register a new user 
//@params POST /v1/api/essai/register
//@access  PUBLIC 
  async register(data) {
    try {
      const { userName, email, phone, password } = data;
        // Check if the user with the provided email already exists
        const existUser = await user.findOne({ email });
        if (existUser) {
            return { success: false, status: 400, msg: 'User already registered' };
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user with hashed password
        const newUser = await user.create({ userName, email, phone, password: hash });

        // Generate JWT token for the new user
        const token = jwt.sign({ sub: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
        return { success:true,token};
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
}

 //@desc login as a user 
//@params POST /v1/api/essai/login
//@access  PUBLIC 
async login(data) {
  try {
    const { email,password } = data;
      // Check if the user with the provided email already exists
      const existUser = await user.findOne({ email });
      if (!existUser) {
          return { success: false, status: 400, msg: 'You Should register first ' };
      }
      const validate = await bcrypt.compare(password,existUser.password);
      if (!validate) {
        return { success: false, status: 400, msg: 'invalid password ' };
    }
      const token = jwt.sign({ sub: existUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { success:true,token};
  } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
  }
}

}
module.exports = EssaiService;
    
  
