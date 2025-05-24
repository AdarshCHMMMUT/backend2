import express from 'express'
import { getCategory, getItems, getUserData, getwish } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/data',  getUserData)
userRouter.get('/items',getItems)
userRouter.get('/category',getCategory)
userRouter.get('/getwishlist',getwish)
export default userRouter;