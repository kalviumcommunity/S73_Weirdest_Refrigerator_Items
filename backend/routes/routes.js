import express from 'express';
import { create, deleteUser, getUsers, update } from '../controller/controller.js';

const route = express.Router();

route.post("/create", create);
route.get("/getUsers", getUsers);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser)

export default route;