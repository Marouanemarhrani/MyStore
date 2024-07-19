import orderModel from '../models/orderModel.js';

// Create an order
export const createOrderController = async (req, res) => {
    try {
        const { client, items, totalPrice, paymentMethod } = req.body;

        const newOrder = new orderModel({
            client,
            items,
            totalPrice,
            paymentMethod,
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating order',
            error
        });
    }
};

// Update an order
export const updateOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        const { client, items, totalPrice, status, paymentMethod, paymentStatus } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            { client, items, totalPrice, status, paymentMethod, paymentStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Order updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error updating order',
            error,
        });
    }
};

// Get all orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('items.product', 'name price').sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving orders',
            error
        });
    }
};

// Get order by ID
export const getOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate('items.product', 'name price');

        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Order retrieved successfully',
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving order',
            error
        });
    }
};

// Delete an order
export const deleteOrderController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting order',
            error
        });
    }
};
