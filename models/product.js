import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    updatedAt: Date,

}, { timestamps: true });


const ProductModel = mongoose.model("product", productSchema)

export default ProductModel