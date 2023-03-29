const express = require("express");
const router = express.Router();

const { orderDetails, order, orderHistory } = require("../controllers/orderControllers");

router.route('/addOrder').post(order);
router.route('/orderHistory').get(orderHistory);
router.route("/orderDetails").get(orderDetails);

module.exports = router;