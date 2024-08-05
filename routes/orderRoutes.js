const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { isAuth } = require('../utils');

const orderRouter = express.Router();

// NEW Order history
orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

// Create Order
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log('Received Order Data:', req.body); // Log received data

        try {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemPrice: req.body.itemPrice, // Corrected field name
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createdOrder });
        } catch (error) {
            console.error('Order creation error:', error); // Log server-side errors
            res.status(500).send({ message: 'Error creating order' });
        }
    })
);

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}));


module.exports = orderRouter;

