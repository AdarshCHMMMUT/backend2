import e from "express";
import { addaddon, addcoupon, addstaff, addvariation, adminLogin, adminLogout, createOrder, getstaffs, getvariations, updateStatus } from "../controller/admincontroller.js";

const adminRouter = e.Router();
adminRouter.post('/adminlogin',adminLogin);
adminRouter.post('/adminlogout', adminLogout);
adminRouter.post('/addstaff', addstaff);
adminRouter.post('/addcoupon', addcoupon);
adminRouter.post('/addaddon', addaddon);
adminRouter.post('/addvariation', addvariation);
adminRouter.get('/getstaff', getstaffs);
adminRouter.get('/getvariation', getvariations);    
adminRouter.post('/createorder', createOrder);
adminRouter.put('/updatestatus/:orderId', updateStatus);

export default adminRouter;