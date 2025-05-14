import express from 'express'
import { getItems, getUserData } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/data',  getUserData)
userRouter.get('/items',getItems)

export default userRouter;