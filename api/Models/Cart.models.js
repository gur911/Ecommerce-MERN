import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    imgSrc: {
        type:String,
        require: true
    }
})

// sbke alg alg users k alg alg cart honge ab items k andr bhi to hr ek product ka diff hoga systum
const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    items: [
        cartItemSchema
    ],
})

export const Cart = mongoose.model('Cart',cartSchema);