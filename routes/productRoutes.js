const express = require("express");
const router = express.Router();


const { viewProducts, getSingleProduct, addProducts, updateProducts, removeProducts } = require("../controllers/productControllers");
let authentication = require('../middlewares/authentication');

router.route("/").get(viewProducts);
router.route("/Product:id").get(getSingleProduct).post(authentication, addProducts).patch(authentication, updateProducts).delete(authentication, removeProducts);

module.exports = router;