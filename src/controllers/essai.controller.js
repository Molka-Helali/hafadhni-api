// Importing the essaiService module from the '../services/essai.service' file
const essaiService = require('../services/essai.service');
// Importing the essai model from the "../models/essai.model" file
const essai = require("../models/essai.model");
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

// Defining a new class essaiController which extends IBaseController
class essaiController extends IBaseController {
  constructor() {
    // Calling the constructor of the parent class (IBaseController) and passing an instance of essaiService initialized with essai model
    super(new essaiService(essai));
    // Initializing an instance of essaiService with essai model and assigning it to the property essaiService of the essaiController class
    this.essaiService = new essaiService(essai);
  }





 
  // Defining a custom method called Custom that takes in request (req) and response (res) objects
  Custom = async (req, res) => {
    // Await and handle the promise returned by the service's custom method, passing the request body as a parameter.
    await this.handleRequest(this.essaiService.custom(req.body), res);
  }

  CustomPhoto = async (req, res) => {
    // Await and handle the promise returned by the service's customPhoto method, passing the data object as a parameter.
    await this.handleRequest(this.essaiService.customPhoto(req.body), res);
  }

  Text = async (req, res) => { 
    // Await and handle the promise returned by the service's CustomText method, passing the request body as a parameter.
    await this.handleRequest(this.essaiService.Text(req.body), res);
  }
  Translation = async (req, res) => {
    // Await and handle the promise returned by the service's CustomText method, passing the request body as a parameter.
    await this.handleRequest(this.essaiService.translation(req.body), res);
  }
  SummaryText = async (req, res) => {
    // Await and handle the promise returned by the service's CustomText method, passing the request body as a parameter.
    await this.handleRequest(this.essaiService.summaryText(req.body), res);
  }

  /*user = async (req, res) => {
    // Await and handle the promise returned by the service's utilisateur method, passing the request body as a parameter.
    await this.handleRequest(this.essaiService.user(req.body), res);
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
      await this.handleRequest(this.essaiService.register(req.body), res);
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
   
  login = async (req, res) => {
    await this.handleRequest(this.essaiService.login(req.body), res);
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
      req.userId=verifyToken.sub;
      // Call next() to proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
    //@desc get user information 
    //@params GET/v1/api/essai/auth
    //@access Privte
  async  getUserInfo(req, res) {
    try {
      const userInfo = await user.findById( req.userId).select('-password -__v');
      res.json({ userInfo });
    } catch (error) {
      console.error('Error fetching user info:', error);
      return res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  }
  
*/
}
// Exporting the essaiController class to be used in other modules
module.exports = essaiController;
