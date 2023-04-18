const { Op, user } = require('../models');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { createError } = require('../errors/customError');

let login = asyncWrapper(async (req, res, next) => {
    let data = await user.findOne({ where: { email: req.body.email } });
    let token = data.token();
    res.status(StatusCodes.OK).json({ data, token });
});

let signUp = asyncWrapper(async (req, res, next) => {
    let data = await user.create(req.body);
    res.status(StatusCodes.CREATED).json(data);
});

let getAllUsers = asyncWrapper(async (req, res, next) => {
    let { age, address, page } = req.query;
    if (!page) {
        return next(createError(StatusCodes.BAD_REQUEST, 'url is not correct'));
    }
    // if (age) {
    //     ageRange = age.split(',');
    // }
    let users = await user.findAll({
        where: {
            address: address || { [Op.ne]: null },
            // age: age ? { [Op.gte]: Number(ageRange[0]), [Op.lte]: Number(ageRange[1]) } : { [Op.ne]: null }
        },
        limit: 5, offset: (Number(page) - 1) * 5
    });
    let count = await user.count()
    res.status(StatusCodes.OK).json({ count, users });
});

let getSingleUser = asyncWrapper(async (req, res, next) => {
    let usr = await user.findOne({ where: { email: req.params.email } });
    res.status(StatusCodes.OK).json(usr);
});

module.exports = { getAllUsers, getSingleUser, login, signUp };