const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  const { userId, address, paymentInfo, items } = req.body;
  try {
    const order = new Order({
      userId,
      items,
      address,
      paymentInfo,
      status: "Processing",
    });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};
