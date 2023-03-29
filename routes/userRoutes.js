const express = require('express');
const router = express.Router();
let { home, login, signUp } = require('../controllers/userControllers');

router.route('/').get(home);
router.route('/login').post(login);
router.route('/signUp').post(signUp);

module.exports = router;
