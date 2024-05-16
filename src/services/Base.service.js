// Importing the mongoose module for interacting with MongoDB
const mongoose = require('mongoose');
// Importing the MulterMiddleware module from '../middlewares/multer.middleware' for handling file uploads
const MulterMiddleware = require('../middlewares/multer.middleware');
// Importing the fs module for file system operations, with promises support
const fs = require('fs').promises;
// Importing the path module for working with file and directory paths
const path = require('path');

// Defining a class BaseService which will serve as a base service for interacting with MongoDB models
class BaseService {
    constructor(model) {
        // Initializing the BaseService with a model, which represents a MongoDB collection
        this.model = model;
        // Creating an instance of MulterMiddleware for handling file uploads
        this.multerMiddleware = new MulterMiddleware();
    }
    
    // Method to fetch all entities from the database
    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            // Handling errors that occur during the database operation
            throw new Error(`Error fetching entities: ${error.message}`);
        }
    }

    // Method to fetch an entity by its ID from the database
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Error fetching entity by ID: ${error.message}`);
        }
    }

    async create(req, res = null, hasImage = false) {
        try {
            const data = req.body; // Extracting data from the request body
            
            // Check if the _id is provided and if a document with that _id already exists
            if (data._id) {
                const existingDoc = await this.model.findById(data._id);
                if (existingDoc) {
                    throw new Error(`Document with _id ${data._id} already exists.`);
                }
            } else {
                // Generate a new _id if it's not provided in the request
                data._id = new mongoose.Types.ObjectId(); // Using new ObjectId() to generate ObjectId
            }
        
            if (hasImage) {
                // If the request includes image files, upload them and add their filenames to the data
                const uploadedImages = await this._uploadImages(req, res);
                if (uploadedImages) {
                    // Map the uploaded images to an array of objects with 'name' property
                    data.images = uploadedImages.map(file => ({ name: file.filename }));
                }
            }
            // Creating a new document in the MongoDB collection with the provided data
            return await this.model.create(data);
        } catch (error) {
            // Handle specific error cases, such as duplicate _id
            if (error.message.includes('Document with _id')) {
                throw new Error('Error creating entity: Document with this _id already exists.');
            }
            throw new Error(`Error creating entity: ${error.message}`);
        }
    }
    // Method to update an existing entity in the database
    async update(req, res = null, hasImage = false) {
        try {
            const data = req.body; // Extracting updated data from the request body
            if (hasImage && req && req.files && Object.keys(req.files).length > 0) {
                // If the request includes image files, upload them and update the entity's images
                const uploadedImages = await this._uploadImages(req, res);
                if (uploadedImages && uploadedImages.length > 0) {
                    // If new images are uploaded, delete the existing images associated with the entity
                    const temp = await this.getById(req.params.id);
                    if (temp && temp.images && temp.images.length > 0) {
                        await Promise.all(temp.images.map(async (t) => {
                            try {
                                await this._deleteImage(t.name); // Assuming 't' contains 'name' property
                            } catch (error) {
                                console.error(`Error deleting image ${t.name}:`, error);
                            }
                        }));
                    }
                    // Update the entity's images with the filenames of the newly uploaded images
                    data.images = uploadedImages.map(file => file.filename);
                }
            }
            // Updating the entity in the MongoDB collection with the provided data
            return await this.model.findByIdAndUpdate(req.params.id, data, { new: true });
        } catch (error) {
            throw new Error(`Error updating entity: ${error.message}`);
        }
    }

    // Method to delete an entity from the database
    async delete(id, hasImage = false) {
        try {
            if (hasImage) {
                // If the entity has associated images, delete them from the file system
                const temp = await this.getById(id);
                if (temp && temp.images) {
                    await Promise.all(temp.images.map(async (t) => {
                        try {
                            await this._deleteImage(t.name); // Assuming 't' contains 'name' property
                        } catch (error) {
                            console.error(`Error deleting image ${t.name}:`, error);
                        }
                    }));
                }
            }
            // Deleting the entity from the MongoDB collection by its ID
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting entity: ${error.message}`);
        }
    }

    // Method to upload images using the MulterMiddleware
    async _uploadImages(req, res) {
        return await this.multerMiddleware.uploadMultipleImages(req, res);
    }

    // Method to delete an image from the file system
    async _deleteImage(filename) {
        // Constructing the path to the image file
        const imagePath = path.join(__dirname, "../../uploads/", filename);
        // Deleting the image file from the file system
        await fs.unlink(imagePath);
        console.log(`${filename} successfully deleted`);
    }
}

// Exporting the BaseService class to be used in other modules
module.exports = BaseService;
