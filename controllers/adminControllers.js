const { admin } = require('../models');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');

let viewAdmins = asyncWrapper(async (req, res, next) => {
    let users = await admin.findAll();
    let total = await admin.count();
    res.status(StatusCodes.OK).json({ count: total, users });
});

const login = asyncWrapper(async (req, res, next) => {
    let user = await admin.findOne(req.body);
    let token = user.token();
    res.status(StatusCodes.OK).json({ user, token });
});

const addAdmin = asyncWrapper(async (req, res, next) => {
    let user = await admin.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
});

module.exports = { viewAdmins, login, addAdmin };