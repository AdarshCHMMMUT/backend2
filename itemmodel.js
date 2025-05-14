import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
    name: {type:String},
    price:{type:String},
    quantity: {type:String},
    description:{type:String},
    longDescription:{type:String},
    image:{type:String},
    veg:{type:Boolean},
    rating:{type:Number}
})

const itemModel =mongoose.models.items || mongoose.model('items',itemSchema);
export default itemModel;
