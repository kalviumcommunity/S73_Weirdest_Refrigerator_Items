import express from "express";
import cors from 'cors'
import { createEntity, getEntities, updateEntity, deleteEntity } from "../controller/entityController.js";


const router = express.Router();
router.use(cors());
router.post("/", createEntity);
router.get("/", getEntities);
router.put("/:id", updateEntity);
router.delete("/:id", deleteEntity);

export default router;
