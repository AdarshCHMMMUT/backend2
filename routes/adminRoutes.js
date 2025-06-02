import e from "express";
import { addaddon, addcoupon, additem, addstaff, addvariation, adminLogin, adminLogout, createOrder, deleteitem, deletevariation, getstaffs, getvariations, updateStatus } from "../controller/admincontroller.js";

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
adminRouter.delete('/deletevariation', deletevariation);
adminRouter.post('/additem',additem);
adminRouter.delete('/deleteitem',deleteitem);
// adminRouter.post()

export default adminRouter;