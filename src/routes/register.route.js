// Importing the essaiController module from the '../controllers/essai.controller' file
const registerController = require('../controllers/essai.controller');

// Importing the BaseRoute module from the './Base.route' file
const BaseRoute = require('./Base.route');

// Importing the routes enum from the '../utils/enum/routes.enum' file
const routes = require("../utils/enum/routes.enum");
const multerMiddleware = require("../middlewares/multer.middleware");

// Defining a new class essaiRoutes which extends BaseRoute
class essaiRoutes extends BaseRoute {
    constructor() {
        // Calling the constructor of the parent class (BaseRoute) and passing an instance of essaiController
        super(new essaiController());

        // Initializing an instance of essaiController and assigning it to the property essaiController of the essaiRoutes class
        this.essaiController = new essaiController();
        this.multerMiddleware= new multerMiddleware();

        // Calling the setupRoutes method and catching any errors that occur
        this.setupRoutes().catch(error => {
            console.error('Error setting up routes:', error);
        });
    }

    // Asynchronously setting up routes
    async setupRoutes() {
        // Calling the setupRoutes method of the parent class (BaseRoute)
        await super.setupRoutes();
      
        const UpdateRegisterHandle = this.essaiController.register.bind(this.essaiController);
   
        // Adding a GET route with the path specified in the routes enum, using the getByPriceHandler as the route handler
        
        this.router.patch(routes. PATCH_Register, UpdateRegisterHandle );
   
    
    }
}

// Exporting the essaiRoutes class to be used in other modules
module.exports = registerController;