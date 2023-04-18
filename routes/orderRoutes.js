const express = require("express");
const router = express.Router();

const { orderDetails, createOrder, orderHistory, getAllOrders } = require("../controllers/orderControllers");

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(orderDetails);
router.route("/orderHistory/:userEmail").get(orderHistory);

module.exports = router;