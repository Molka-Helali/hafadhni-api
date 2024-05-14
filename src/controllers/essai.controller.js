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
    const _id = req.params.id;
    let photo = [];
    // Check if files were uploaded
    if (req.files && req.files.length > 0) {
      req.files.forEach((oneImage) => {
        let image = { name: oneImage.filename };
        photo.push(image);
      });
    }
    const data = { _id, photo };
    const messages = {
      message: "Images have been added successfully",
      status: "success",
    };
    try {
      const result = await this.essaiService.customPhoto(data);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in CustomPhoto:", error);
      res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
  };
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


}
// Exporting the essaiController class to be used in other modules
module.exports = essaiController;
