// Importing the essaiController module from the '../controllers/essai.controller' file
const essaiController = require('../controllers/essai.controller');
const Essai = require("../models/essai.model");
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
        this.multerMiddleware = new multerMiddleware();

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
        const UpdatePhotoHandle = this.essaiController.CustomPhoto.bind(this.essaiController);
        const UpdateTextHandle = this.essaiController.Text.bind(this.essaiController);
        const UpdateTranslationHandle = this.essaiController.Translation.bind(this.essaiController);

        // Defining routes
        this.router.post(routes.Translation, UpdateTranslationHandle);
        this.router.post(routes.PATCH_SCORE, UpdateScoreHandle);
        this.router.patch(routes.PATCH_PHOTO, this.multerMiddleware.upload, UpdatePhotoHandle);

        this.router.post("/text", async (req, res) => {
            const { text, userId } = req.body;
            console.log(req.body);

            try {
                let existEssai = await Essai.findOne({ userId });

                if (existEssai) {
                    existEssai.summaryText.push({ text });
                    existEssai = await existEssai.save();
                } else {
                    const essai = new Essai({
                        userId: userId,
                        summaryText: [{ text }],
                    });
                    existEssai = await essai.save();
                }

                res.status(200).json(existEssai);
            } catch (error) {
                res.status(400).json({ error: error.message });
                console.log(error.message);
            }
        });

        this.router.post("/text/hafathni", async (req, res) => {
            const { content, userId } = req.body;
            console.log(req.body);

            try {
                let existEssai = await Essai.findOne({ userId });

                if (existEssai) {
                    existEssai.text.push({ content });
                    existEssai = await existEssai.save();
                } else {
                    const essai = new Essai({
                        userId: userId,
                        text: [{ content }],
                    });
                    existEssai = await essai.save();
                }

                res.status(200).json(existEssai);
            } catch (error) {
                res.status(400).json({ error: error.message });
                console.log(error.message);
            }
        });
    }
}

// Exporting the essaiRoutes class to be used in other modules
module.exports = essaiRoutes;
