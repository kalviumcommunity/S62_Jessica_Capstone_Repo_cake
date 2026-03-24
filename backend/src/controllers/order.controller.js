const Order = require("../models/order.model");

const createOrder = async (req, res) => {

  try {

    const { items, totalPrice, deliveryAddress } = req.body;

    const order = await Order.create({

      userId: null,   // temporary until auth middleware exists

      items,
      totalPrice,
      deliveryAddress

    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const getOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("items.cakeId", "name");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

module.exports = {
createOrder,
getOrders,
updateOrderStatus
};