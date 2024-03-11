// Importing the express module
const express = require('express');
// Creating a router instance using express.Router()
const router = express.Router();
// Importing the ExampleRoutes module from './example.route'
const ExampleRoutes = require('./example.route');
// Importing the MODELS enum from the '../utils/enum/routes.enum' file
const { MODELS } = require("../utils/enum/routes.enum");
// Creating an instance of ExampleRoutes
const exampleRoutes = new ExampleRoutes();
// Mounting the exampleRoutes router under the path specified by MODELS.EXAMPLE
router.use(MODELS.EXAMPLE, exampleRoutes.getRouter());
// Exporting the router to be used in other modules
module.exports = router;