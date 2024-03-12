// Importing the express module
const express = require('express');
// Creating a router instance using express.Router()
const router = express.Router();
// Importing the ExampleRoutes module from './example.route'
const EssaiRoutes = require('./essai.route'); // Change variable name to EssaiRoutes
// Importing the MODELS enum from the '../utils/enum/routes.enum' file
const { MODELS } = require("../utils/enum/routes.enum");
// Creating an instance of ExampleRoutes
const essaiRoutes = new EssaiRoutes(); // Change variable name to EssaiRoutes
// Mounting the exampleRoutes router under the path specified by MODELS.EXAMPLE
router.use(MODELS.essai, essaiRoutes.getRouter());
// Exporting the router to be used in other modules
module.exports = router;