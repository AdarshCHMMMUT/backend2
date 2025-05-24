import categoryModel from "../categorymodel.js";
import Itemmodel from "../itemmodel.js";
import userModel from "../usermodel.js";
import wishmodel from "../wishmodel.js";
export const getUserData = async(req,res) =>
{
  try{
       const {userId}  = req.body;
       const user  = await userModel.findById(userId);
       if(!user)return res.json({success:false, message: 'Invalid otp'});
    

        res.json({success:true,
        userData:{
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }
       });

  }
  catch(error)
  {
    return res.json({success:false, message: 'Invalid otp'});

  }
}

export const getItems = async(req,res) =>
{
  try{

    
       const itemsdata = await Itemmodel.find().lean();
       return res.json({success:true, itemsdata});
  }
  catch(error)
  {
     return res.json({success:false, message: `unable to get data ${error.message}`})
  }
}

export const  getCategory = async(req,res)=>{
  try{
    const categories = await categoryModel.find().lean();
    return res.json({success:true,categories});
  }
  catch(error){
    return res.json({success:false, message: 'unable to get data ${error.message}'})
  }
  
}
export const getwish = async(req, res) =>
{
  try{
    const {userId} = req.body;
    const user = await wishmodel.findOne({user:userId}).populate('wishlist');
    if(!user)return res.json({success:false, message: 'user not found'});
    return res.json({success:true, wishlist: user.wishlist});
  }
  catch(error)
  {
    return res.json({success:false, message: 'server error',message: error.message});
  }
}