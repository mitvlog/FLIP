import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
      ref: "product"
        },
        quantity: Number,
        name: String,
        price: Number
        
      },
      
    ],
    
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true });


const CartModal = mongoose.model("cart", cartSchema)

export default CartModal