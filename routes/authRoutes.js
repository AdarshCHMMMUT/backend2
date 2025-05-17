import express from "express";
import { login, logout, update, updateAddress } from "../controller/authController.js";
const authRouter = express.Router();
authRouter.post('/login',login);

authRouter.post('/logout',logout);
authRouter.post('/update',update)
authRouter.post('/updateaddress',updateAddress);

export default authRouter;