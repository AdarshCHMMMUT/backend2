import categoryModel from "../categorymodel.js";
import itemModel from "../itemmodel.js";
import userModel from "../usermodel.js";

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
       const itemsdata = await itemModel.find();
       return res.json({success:true, itemsdata});
  }
  catch(error)
  {
     return res.json({success:false, message: 'unable to get data ${error.message}'})
  }
}

export const  getCategory = async(req,res)=>{
  try{
    const categories = await categoryModel.find();
    return res.json({success:true,categories});
  }
  catch(error){
    return res.json({success:false, message: 'unable to get data ${error.message}'})
  }
  
}