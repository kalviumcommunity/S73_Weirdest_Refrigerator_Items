import Entity from '../models/entitySchema.js'; 

// Create a new entity
export const createEntity = async (req, res) => {
    try {
        const entityData = new Entity(req.body);
        const savedEntity = await entityData.save();
        res.status(201).json(savedEntity);
    } catch (err) {
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
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Update an entity
export const updateEntity = async (req, res) => {
    try {
        const id = req.params.id;
        const entityExists = await Entity.findById(id);
        if (!entityExists) {
            return res.status(404).json({ message: "Entity not found!" });
        }
        const updatedEntity = await Entity.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedEntity);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Delete an entity
export const deleteEntity = async (req, res) => {
    try {
        const id = req.params.id;
        const entityExists = await Entity.findById(id);
        if (!entityExists) {
            return res.status(404).json({ message: "Entity not found!" });
        }
        await Entity.findByIdAndDelete(id);
        res.status(201).json({ message: "Entity deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
};
