import express from 'express'
import { addwish, deleteaddress, getAddresses, getCategory, getItems, getOrders, getUserData, getwish } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/data',  getUserData)
userRouter.get('/items',getItems)
userRouter.get('/category',getCategory)
userRouter.get('/getwishlist',getwish)
userRouter.post('/addwish',addwish)
userRouter.post('/getaddresses', getAddresses);
userRouter.post('/deleteaddress', deleteaddress);
userRouter.post('/getorders',getOrders);
export default userRouter;