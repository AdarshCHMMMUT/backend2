import Addonmodel from "../addonmodel.js";
import adminmodel from "../adminmodel.js";
import couponModel from "../couponmodel.js";
import Variationmodel from "../variationmodel.js";
import orderModel from "../ordermodel.js";
import {  db } from '../src/firebase/firebaseadmin.js';
import Itemmodel from "../itemmodel.js";
import userModel from "../usermodel.js";
import categoryModel from "../categorymodel.js";


export const adminLogin = async(req,res) =>
{
  try{
   const {role,phone,password} = req.body;
   const admin = await adminmodel.findOne({role:role, phone:phone, password:password})
   console.log(admin);
   if(admin)
   {
    res.cookie("admin",admin._id,{httpOnly:true,secure:true,sameSite:"none"})
    res.status(200).json({message:"login successfull"})
   }
   else
   {
    res.status(400).json({message:"login failed",role:role, phone:phone, password:password,admin})
   }}
   catch(error)
   {
    res.status(500).json({message:"server error"})
   }
}


export const adminLogout = async(req, res) =>
{
  try{
    res.clearCookie("admin")
    res.status(200).json({message:"logout successfull"})
  }
  catch(error)
  {
    res.status(500).json({message:"server error"})
  }
}


export const addstaff = async(req, res) =>
{
  try{
    const {role,phone, password} = req.body;
    const staff = await adminmodel.create({ role, phone, password})
    res.status(200).json({message:"staff added successfully", staff})
  }
  catch(error)
  {
    res.status(500).json({message:"server error"})
  }
}

export const addcoupon = async(req, res) =>
{
  try{
    const {code,condition,discount, expiry , used,} = req.body;
    const coupon = await couponModel.create({ code,condition, discount, expiry, used})
    console.log(coupon,code);
    res.status(200).json({message:"coupon added successfully", coupon})
  }
  catch(error)
  {
    res.status(500).json({message:"server error",code, condition,discount, expiry, used})
  }
}

export const getstaffs = async(req, res) =>
{
  try{
    const staffs = await adminmodel.find()
    res.status(200).json({message:"staffs fetched successfully", staffs})
  }
  catch(error)
  {
    res.status(500).json({message:"server error"})
  }
}
export const getvariations = async(req,res) =>
{
  try{
    const variations = await Variationmodel.find()
    res.status(200).json({message:"variations fetched successfully", variations})
  }
  catch(error)
  {
    res.status(500).json({message:`server error${error}`})
  }

}
export const addaddon = async(req,res)=>
{
  try{
      const {name, price, description, category, veg, available } = req.body;
      // take itemdId
      const addon = await Addonmodel.create({name, price, description, category, veg, available})
      // const updatedItem = await Itemmodel.findByIdAndUpdate(
      //   itemId,
      //   { $push: { addons: addon._id } },
      //   { new: true }
      // );
      res.status(200).json({message:"addon added successfully", addon})
  }
  catch(err)
  {
    res.status(500).json({message:"server error",err })
  }
}

// export  const addvariation = async(req,res) =>
// {
//   try{
//     const {name, price, stock} = req.body;  
//     const variation = await Variationmodel.create({name, price,  stock})
//     res.status(200).json({message:"variation added successfully", variation})
//   }
//   catch(err)
//   {
//     res.status(500).json({message:"server error ", message: err.message})
//   }
// }

export const addvariation = async (req, res) => {
  try {
    const { name, price, stock, itemId } = req.body; 
    const variation = await Variationmodel.create({ name, price, stock });
    await variation.save();
    const updatedItem = await Itemmodel.findByIdAndUpdate(
      itemId,
      { $push: { variation: variation._id } },
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Variation added and linked to item successfully",
      variationId: variation._id,
      variation,
      updatedItem
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const deletevariation = async(req,res) =>
{
  try{
    const {variationId,itemId} = req.body;
    const variation = await Variationmodel.findByIdAndDelete(variationId);
    if(!variation)
    {
      return res.status(404).json({message:"variation not found"})
    }
    const updatedItem = await Itemmodel.findByIdAndUpdate(
      itemId,
      { $pull: { variation: variationId } },
      { new: true } 
    );
    if(updatedItem.modifiedCount === 0)
    {
      return res.status(404).json({message:"item not found"})
    }
    res.status(200).json({message:"variation deleted successfully", item: updatedItem});
  }
  catch(err)
  {
    res.status(500).json({message:"server error", err: err.message})
  }
}
export const createOrder = async (req, res) => {
  try{
  const newOrder = new orderModel(req.body); 
  const id = req.body.customer_id;
  const savedOrder = await newOrder.save();

  const updateduser = await userModel.findByIdAndUpdate(
      id,
      { $push: { orders: savedOrder._id } },
      { new: true } 
    );

  await db.ref(`orders/${savedOrder._id}`).set({
    status: "Placed",
    timestamp: Date.now()
  });

  res.status(201).json({ message: "Order placed",  order: savedOrder, user: updateduser });
}
catch(err)
{
  res.status(500).json({message: `${err}`})
}
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;
    if (!newStatus) {
      return res.status(400).json({ message: "newStatus is required in request body" });
    }
    console.log(orderId);
    console.log(newStatus);
    await db.ref(`orders/${orderId}/status`).set(newStatus);
    await orderModel.findByIdAndUpdate(orderId, { status: newStatus });
    
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

export const additem = async(req,res) =>
{
  try{
    const {name, price, description,longDescription, image, veg} = req.body;
    const item = await Itemmodel.create({name, price, description,longDescription, image, veg});
    res.status(200).json({message:"item added successfully", item})
  }
  catch(err)
  {
    res.status(500).json({message:"server error", err: err.message})
  }
}
export const deleteitem = async(req,res) =>
{
  try{
    const {itemId} = req.body;
    const item = await Itemmodel.findByIdAndDelete(itemId);
    if(!item)
    {
      return res.status(404).json({message:"item not found"})
    }
    res.status(200).json({message:"item deleted successfully", item})
  }
  catch(err)
  {
    res.status(500).json({message:"server error", err: err.message})
  }
}

// export const addcategory = async(req,res) => 
// {
//   try {
//     const { name, id } = req.body;
//     const category = await categoryModel.create({ name, id });
//     if (!category) {
//       return res.status(400).json({ message: "Failed to create category" });
//     }
//     res.status(200).json({ message: "Category added successfully", category });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", err: err.message });
//   }
// }

// export const deletecategory = async(req,res) =>
// {
//   try {
//     const { categoryId } = req.body;
//     const category = await categoryModel.findByIdAndDelete(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(200).json({ message: "Category deleted successfully", category });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", err: err.message });
//   }
// }