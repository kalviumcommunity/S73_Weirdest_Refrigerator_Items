import Entity from '../models/entitySchema.js';

const validateEntity = (name, description, imageUrl, created_by) => {
    if (!description || description.trim().length < 5) {
        return "Description must be at least 5 characters long.";
    }
    if (!created_by || created_by.trim() === "") {
        return "Created_by (User ID) is required.";
    }
    return null;
};

export const createEntity = async (req, res) => {
    const { name, description, imageUrl, created_by } = req.body;

    console.log("Received request to create entity:", req.body);

    const validationError = validateEntity(name, description, imageUrl, created_by);
    if (validationError) {
        console.error("Validation Error:", validationError);
        return res.status(400).json({ error: validationError });
    }

    try {
        const entityData = new Entity({ name, description, imageUrl, created_by });
        const savedEntity = await entityData.save();
        console.log("Entity saved successfully:", savedEntity);
        res.status(201).json(savedEntity);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

export const getEntities = async (req, res) => {
    const { created_by } = req.query;

    try {
        let filter = {};
        if (created_by) {
            filter.created_by = created_by;
        }

        const entities = await Entity.find(filter).populate("created_by");

        if (entities.length === 0) {
            return res.status(404).json({ message: "No entities found!" });
        }

        res.status(200).json(entities);
    } catch (err) {
        console.error("Error fetching entities:", err);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

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
