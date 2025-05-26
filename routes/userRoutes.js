import express from 'express'
import { addwish, deleteaddress, getAddresses, getCategory, getItems, getUserData, getwish } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/data',  getUserData)
userRouter.get('/items',getItems)
userRouter.get('/category',getCategory)
userRouter.get('/getwishlist',getwish)
userRouter.post('/addwish',addwish)
userRouter.post('/getaddresses', getAddresses);
userRouter.post('/deleteaddress', deleteaddress);
export default userRouter;