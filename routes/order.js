const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Check if the function exists before assigning it
if (typeof orderController.createOrder !== "function") {
  throw new Error("createOrder is not a function or not exported correctly");
}

router.post("/create", orderController.createOrder);
router.get("/user/:userId", orderController.getOrdersByUser);

module.exports = router;
