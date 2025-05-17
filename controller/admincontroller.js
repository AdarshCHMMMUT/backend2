import adminmodel from "../adminmodel.js";
import couponModel from "../couponmodel.js";
import Variationmodel from "../variationmodel.js";



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
    res.status(500).json({message:"server error"})
  }

}