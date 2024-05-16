// Importing the userService module from the '../services/user.service' file
const userService = require('../services/user.service ');
// Importing the user model from the "../models/user.model" file

const user = require("../models/user.model");

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const Joi = require('joi');
const schemaValidation = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  
});

// Importing the IBaseController module from the "./IBase.controller" file
const IBaseController = require("./IBase.controller");
const { Roles } = require('../utils/enum/roles.enum');

// Defining a new class userController which extends IBaseController
class userController extends IBaseController {
  constructor() {
    // Calling the constructor of the parent class (IBaseController) and passing an instance of userService initialized with user model
    super(new userService(user));
    // Initializing an instance of userService with user model and assigning it to the property userService of the userController class
    this.userService = new userService(user);
  }


  user = async (req, res) => {
    // Await and handle the promise returned by the service's utilisateur method, passing the request body as a parameter.
    await this.handleRequest(this.userService.user(req.body), res);
  }
    // Method for user registration
  register = async (req, res) => {
    try {
      // Validate the request body against the Joi schema
      const validationResult = schemaValidation.validate(req.body);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
      }
  
      // If validation passes, proceed with registering the user
      await this.handleRequest(this.userService.register(req.body), res);
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
   
  login = async (req, res) => {
    await this.handleRequest(this.userService.login(req.body), res);
  };
 // Middleware for authentication using JWT token
  auth = async (req, res, next) => {
    try {
      const token = req.headers.token;
      console.log(token);
      if (!token) {
        return res.status(400).json({ success: false, msg: 'You are not authorized.' });
      }
      const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
      req._id=verifyToken.sub;
      // Call next() to proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
    //@desc get user information 
    //@params GET/v1/api/user/auth
    //@access Privte
  async  getUserInfo(req, res) {
    try {
      const userInfo = await user.findById( req._id).select('-password -__v');
      res.json({ userInfo });
    } catch (error) {
      console.error('Error fetching user info:', error);
      return res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  }
  

}
// Exporting the userController class to be used in other modules
module.exports = userController;


  /*updateProfileController  = async (req, res) => {
    await this.handleRequest(this.userService.login(req.body), res);
  };*/