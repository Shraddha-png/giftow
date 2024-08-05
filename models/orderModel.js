const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                slug: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                variety: { type: String, required: true }, // Added variety
                code: { type: String, required: true }, // Added code
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true }, 
            companyName: { type: String, required: true }, 
            businessName: { type: String, required: true }, 
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            region: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemPrice: { type: Number, required: true }, // Corrected field name
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
