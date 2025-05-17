import mongoose from "mongoose";


const variationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itemmodel',
        required: true
    },
    images: [{
        type: String,
        required: true
    }]

})

const Variationmodel = mongoose.models.variations || mongoose.model("variations", variationSchema);
export default Variationmodel;
