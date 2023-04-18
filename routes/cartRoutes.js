const express = require("express");
const router = express.Router();

const { viewCart, addProductToCart, removeProductToCart, deleteCart } = require("../controllers/cartControllers");

router.route('/').get(viewCart).post(addProductToCart);
router.route('/:id').delete(removeProductToCart);
router.route('/deleteCart/:userEmail').delete(deleteCart);

module.exports = router;