const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const security = require("../middleware/security");

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const order = await Order.createOrder({ user, order: req.body });
    return res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.listOrders();
    return res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.fetchOrderById(orderId);
    return res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
