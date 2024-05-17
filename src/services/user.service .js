// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the user model from "../models/user.model"


const {Roles} = require("../utils/enum/roles.enum");
const user = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const { date, exist } = require("joi");


// Defining a new class userService which extends BaseService
class userService extends BaseService {
  constructor() {
    
   
    // Calling the constructor of the parent class (BaseService) and passing the user model
    super(user);
   
  }

  // Defining a custom method called custom that takes in data as a parameter
 /* async custom(data) {
    try {
      // Updating the user model by pushing the score data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { score: data.score } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }*/

  // Defining a custom method called customPhoto that takes in data and _id as parameters
  /*async customPhoto(data) {
    try {
      // Updating the user model by pushing the photo data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { photo: data.photo } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }*/

  // Defining a custom method called customText that takes in data as a parameter
  /*async Text(data) {
    try {
      // Updating the user model by pushing the Text data to the specified entity
      return await this.model.findByIdAndUpdate(
        { _id: data._id },
        { $push: { text: data.text } }
      );
    } catch (error) {
      // Throwing an error if there's an issue updating the entity
      throw new Error(`Error updating entity by ID: ${error.message}`);
    }
  }*/

 //@desc register a new user 
//@params POST /v1/api/user/
//@access  PUBLIC 
  async user(data) {
    try {
      // Updating the user model by pushing the Text data to the specified entity
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
//@params POST /v1/api/user/register
//@access  PUBLIC 
async register(data) {
  try {
      const { userName, email, password, role } = data;

      // Check if the user with the provided email already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
          return { success: false, status: 400, msg: 'User already registered' };
      }

      // Set isActive based on role
      if (role && (role === Roles.SUPER_ADMIN || role === Roles.ADMIN)) {
        data.isActive = true;
    }

      // Hash the password before storing it
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Create a new user with hashed password
      const newUser = await user.create({ userName, email, password: hash });

      // Generate JWT token for the new user
      const token = jwt.sign({ sub: newUser._id, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { success: true, token };
  } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
  }
}


 //@desc login as a user 
//@params POST /v1/api/user/login
//@access  PUBLIC 
async login(data) {
  try {
    const { email,password,role } = data;
      // Check if the user with the provided email already exists
      const existUser = await user.findOne({ email });
      if (!existUser) {
          return { success: false, status: 400, msg: 'You Should register first ' };
      }
         // Set isActive based on role
         if (role && (role === Roles.SUPER_ADMIN || role === Roles.ADMIN)) {
          data.isActive = true;
      }
      const validate = await bcrypt.compare(password,existUser.password);
      if (!validate) {
        return { success: false, status: 400, msg: 'Incorrect password ' };
    }
    const token = jwt.sign({ sub: existUser._id, id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { success:true,token, id: existUser._id, role: existUser.role};
  } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
  }
}




}
module.exports = userService;
    
  