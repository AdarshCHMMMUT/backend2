import express from 'express'
import { addwish, getCategory, getItems, getUserData, getwish } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/data',  getUserData)
userRouter.get('/items',getItems)
userRouter.get('/category',getCategory)
userRouter.get('/getwishlist',getwish)
userRouter.post('/addwish',addwish)
export default userRouter;