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
//@desc get user information 
//@params GET/v1/api/essai/
//@access Privte
/*async  getUserInfo(req,res) {
  try {
 const userInfo = await user.findById(req.userId)
 res.json(userInfo)
    res.json({ msg: 'User info fetched successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}*/
}


///authmid
/*async authMiddleware(data) {
  try {
    const token = data.headers.token;
    if (!token) {
      return res.status(400).json({ success: false, msg: 'You are not authorized.' });
    }
    const verifyToken = await jwt.verify(token, JWT_SECRET);
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, msg: 'Invalid or expired token.' });
  }
}/*

*/
module.exports = EssaiService;
    
  
  
  /*async loginUser(data) {
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
}*/

/*
  const loginuser = async (req, res, next) => {
  console.log(req.body);
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });

    if (foundUser) {
      const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);
  */
// Exporting the EssaiService class to be used in other modules