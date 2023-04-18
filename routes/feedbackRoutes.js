const express = require("express");
const router = express.Router();

const { createFeedback, viewFeedbacks } = require("../controllers/feedbackControllers");

router.route("/").get(viewFeedbacks).post(createFeedback);

module.exports = router;