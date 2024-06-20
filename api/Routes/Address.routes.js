import express from "express";
import { addAddress, getAddress } from "../Controllers/Address.controllers.js";
import { Authenticated } from "../Middlewares/Auth.middlewares.js";

const router = express.Router();

// add address
router.post('/add',Authenticated,addAddress);

// get address
router.get('/get',Authenticated,getAddress);

export default router;