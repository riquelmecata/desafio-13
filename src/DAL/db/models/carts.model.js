import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({

    products: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: {
            type: Number,
            default: 1
        }
    }]

})

export const CartModel = mongoose.model("Cart", CartSchema)