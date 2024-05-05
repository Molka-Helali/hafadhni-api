// Importing the essaiController module from the '../controllers/essai.controller' file
const essaiController = require('../controllers/essai.controller');

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

        // Binding the Custom method of the essaiController instance to the essaiController object
        const UpdateScoreHandle = this.essaiController.Custom.bind(this.essaiController);
      
        // Binding the Custom method of the essaiController instance to the essaiController object
        const UpdatePhotoHandle  = this.essaiController.CustomPhoto.bind(this.essaiController);
          // Binding the Custom method of the essaiController instance to the essaiController object
          const UpdateTextHandle  = this.essaiController.Text.bind(this.essaiController);
          const UpdateTranslationHandle  = this.essaiController.Translation.bind(this.essaiController);
          const UpdateSummaryTextHandle  = this.essaiController.SummaryText.bind(this.essaiController);
       // Binding the utilisateur method of the essaiController instance to the essaiController object
       /* const UpdateUtilisateurHandle = this.essaiController.user.bind(this.essaiController);*/
    // Binding the utilisateur method of the essaiController instance to the essaiController object
      /*  const UpdateRegisterHandle = this.essaiController.register.bind(this.essaiController);*/
       // Binding the utilisateur method of the essaiController instance to the essaiController object
      /* const UpdateLoginHandle = this.essaiController.login.bind(this.essaiController);*/
       /*const authHandle = this.essaiController. auth.bind(this.essaiController);
       const getUserInfo= this.essaiController. getUserInfo.bind(this.essaiController);*/
      
        // Adding a GET route with the path specified in the routes enum, using the getByPriceHandler as the route handler
        this.router.post(routes.Summary, UpdateSummaryTextHandle);
        this.router.post(routes.Translation, UpdateTranslationHandle);
        this.router.post(routes.PATCH_SCORE, UpdateScoreHandle );
        this.router.post(routes. PATCH_PHOTO,UpdatePhotoHandle);
        this.router.post(routes. PATCH_Text, UpdateTextHandle );
        /*this.router.patch(routes. PATCH_Utilisateur, UpdateUtilisateurHandle );
        this.router.post(routes. POST_USER, UpdateUtilisateurHandle );
        this.router.get(routes. GetUserInfo, UpdateUtilisateurHandle );
        this.router.patch(routes. PATCH_Register, UpdateRegisterHandle );
        this.router.post(routes. POST,UpdateRegisterHandle );
        this.router.post(routes.LOGIN,UpdateLoginHandle );  
        this.router.get(routes.AUTH,authHandle);  
        this.router.get(routes.GETINFO,getUserInfo);  */
    
    }
}

// Exporting the essaiRoutes class to be used in other modules
module.exports = essaiRoutes;