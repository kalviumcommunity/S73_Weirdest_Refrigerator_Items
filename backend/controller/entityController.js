import Entity from '../models/entitySchema.js'; 

// Validation function
const validateEntity = (name, description, imageUrl) => {
    if (!name || name.trim().length < 3) {
        return "Name must be at least 3 characters long.";
    }
    if (!description || description.trim().length < 5) {
        return "Description must be at least 5 characters long.";
    }
    if (!imageUrl || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(imageUrl)) {
        return "Invalid image URL. Must be a valid image format (jpg, jpeg, png, gif).";
    }
    return null;
};

// Create a new entity with validation and logging
export const createEntity = async (req, res) => {
    const { name, description, imageUrl } = req.body;
    
    console.log("Received request to create entity:", req.body); // Debugging log

    // Validate entity input
    const validationError = validateEntity(name, description, imageUrl);
    if (validationError) {
        console.error("Validation Error:", validationError);
        return res.status(400).json({ error: validationError });
    }

    try {
        const entityData = new Entity({ name, description, imageUrl });
        const savedEntity = await entityData.save();
        console.log("Entity saved successfully:", savedEntity); // Debugging log
        res.status(201).json(savedEntity);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Get all entities
export const getEntities = async (req, res) => {
    try {
        const entities = await Entity.find();
        if (entities.length === 0) {
            return res.status(404).json({ message: "No entities found!" });
        }
        res.status(200).json(entities);
    } catch (err) {
        console.error("Error fetching entities:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Update an entity
export const updateEntity = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Received request to update entity with ID: ${id}`, req.body);

        const entityExists = await Entity.findById(id);
        if (!entityExists) {
            return res.status(404).json({ message: "Entity not found!" });
        }

        const updatedEntity = await Entity.findByIdAndUpdate(id, req.body, { new: true });
        console.log("Entity updated successfully:", updatedEntity);
        res.status(200).json(updatedEntity);
    } catch (err) {
        console.error("Error updating entity:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Delete an entity
export const deleteEntity = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Received request to delete entity with ID: ${id}`);

        const entityExists = await Entity.findById(id);
        if (!entityExists) {
            return res.status(404).json({ message: "Entity not found!" });
        }

        await Entity.findByIdAndDelete(id);
        console.log(`Entity with ID ${id} deleted successfully.`);
        res.status(200).json({ message: "Entity deleted successfully!" });
    } catch (err) {
        console.error("Error deleting entity:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};
