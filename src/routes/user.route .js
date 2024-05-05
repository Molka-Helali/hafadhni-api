// Importing the userController module from the '../controllers/user.controller' file
const userController = require('../controllers/user.controller ');

// Importing the BaseRoute module from the './Base.route' file
const BaseRoute = require('./Base.route');

// Importing the routes enum from the '../utils/enum/routes.enum' file
const routes = require("../utils/enum/routes.enum");
const multerMiddleware = require("../middlewares/multer.middleware");

// Defining a new class userRoutes which extends BaseRoute
class userRoutes extends BaseRoute {
    constructor() {
        // Calling the constructor of the parent class (BaseRoute) and passing an instance of userController
        super(new userController());

        // Initializing an instance of userController and assigning it to the property userController of the userRoutes class
        this.userController = new userController();
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

      
       // Binding the utilisateur method of the userController instance to the userController object
        const UpdateUtilisateurHandle = this.userController.user.bind(this.userController);
    // Binding the utilisateur method of the userController instance to the userController object
        const UpdateRegisterHandle = this.userController.register.bind(this.userController);
       // Binding the utilisateur method of the userController instance to the userController object
       const UpdateLoginHandle = this.userController.login.bind(this.userController);
       const authHandle = this.userController. auth.bind(this.userController);
       const getUserInfo= this.userController. getUserInfo.bind(this.userController);
       /*const  updateProfile= this.userController.updateProfileController.bind(this.userController);*/
      
        // Adding a GET route with the path specified in the routes enum, using the getByPriceHandler as the route handler
     
        /*this.router.patch(routes. PATCH_Utilisateur, UpdateUtilisateurHandle );
        this.router.post(routes. POST_USER, UpdateUtilisateurHandle );
        this.router.get(routes. GetUserInfo, UpdateUtilisateurHandle );*/
        this.router.patch(routes. PATCH_Register, UpdateRegisterHandle );
        this.router.post(routes. POST,UpdateRegisterHandle );
        this.router.post(routes.LOGIN,UpdateLoginHandle );  
        this.router.get(routes.AUTH,authHandle);  
        this.router.get(routes.GETINFO,getUserInfo);  
       /* this.router.get(routes.updateProfileController, updateProfile);  */
    
    }
}

// Exporting the userRoutes class to be used in other modules
module.exports = userRoutes;
    /*PATCH_Utilisateur:"/utilisateur",
    POST_USER:"/utilisateur",
    GetUserInfo:"/utilisateur",*/