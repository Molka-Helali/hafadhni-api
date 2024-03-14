// Importing the essaiService module from the '../services/essai.service' file
const essaiService = require('../services/essai.service');
// Importing the essai model from the "../models/essai.model" file
const essai = require("../models/essai.model");
// Importing the IBaseController module from the "./IBase.controller" file
const IBaseController = require("./IBase.controller");
const { log } = require('handlebars');
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
        // Await and handle the promise returned by the service's custom method, passing the request body as a parameter.
        await this.handleRequest(this.essaiService.customPhoto(req.file), res);
        console.log( req.file);
    }
   
     // Defining a custom method called Custom that takes in request (req) and response (res) objects
     CustomText = async (req, res) => {
        // Await and handle the promise returned by the service's custom method, passing the request body as a parameter.
        await this.handleRequest(this.essaiService. CustomText(req.body), res);
    }
}
// Exporting the essaiController class to be used in other modules
module.exports = essaiController;
