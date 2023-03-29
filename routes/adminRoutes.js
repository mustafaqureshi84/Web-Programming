const express = require("express");
const router = express.Router();

const { login, dashboard, addAdmin } = require("../controllers/adminControllers");
let authentication = require('../middlewares/authentication');

router.route("/login").post(login);
router.route("/dashboard").get(dashboard);
router.route("/addAdmin").post(authentication, addAdmin);

module.exports = router;