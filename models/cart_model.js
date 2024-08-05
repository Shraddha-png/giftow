const mongoose = require("mongoose")

var cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        ProductName: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model("Cart", cartSchema0);