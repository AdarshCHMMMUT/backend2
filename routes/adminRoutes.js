import e from "express";
import { addaddon, addcoupon, addstaff, addvariation, adminLogin, adminLogout, createOrder, getstaffs, getvariations, updateStatus } from "../controller/admincontroller.js";
// import { admin } from "../src/firebase/firebaseadmin.js";
// import { get } from "mongoose";
// import { getAddress } from "../controller/adminController.js";

const adminRouter = e.Router();
adminRouter.post('/adminlogin',adminLogin);
adminRouter.post('/adminlogout', adminLogout);
adminRouter.post('/addstaff', addstaff);
adminRouter.post('/addcoupon', addcoupon);
adminRouter.post('/addaddon', addaddon);
adminRouter.post('/addvariation', addvariation);
// adminRouter.post('/pushvariation',pushvariation);
adminRouter.get('/getstaff', getstaffs);
adminRouter.get('/getvariation', getvariations);    
adminRouter.post('/createorder', createOrder);
adminRouter.put('/updatestatus/:orderId', updateStatus);

export default adminRouter;