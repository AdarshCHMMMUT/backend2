import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    role: {type:String},
    phone:{type:Number},
    password: {type:String}
})

const adminmodel = mongoose.models.admins || mongoose.model("admins",adminSchema);
export default adminmodel;