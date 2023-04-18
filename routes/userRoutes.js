const express = require('express');
const authentication = require('../middlewares/authentication');
const router = express.Router();
let { getAllUsers, getSingleUser, login, signUp } = require('../controllers/userControllers');

router.route('/').get(authentication, getAllUsers);
router.route('/:email').get(authentication, getSingleUser);
router.route('/login').post(login);
router.route('/signUp').post(signUp);

module.exports = router;