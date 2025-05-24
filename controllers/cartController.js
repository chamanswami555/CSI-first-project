const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId, "items.productId": { $ne: productId } },
      { $push: { items: { productId, quantity } } },
      { upsert: true, new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};
