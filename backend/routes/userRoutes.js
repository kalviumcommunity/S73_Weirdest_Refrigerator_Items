import express from "express";
import { addUser, getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);

export default router;