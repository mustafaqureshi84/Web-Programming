const { user } = require('../models');

let home = (req, res) => {
    res.send('<h1>User Home Page</h1>');
};

let login = async (req, res) => {
    let data = await user.findOne({ where: { email: req.body.email } });
    let token = data.token();
    res.status(200).json({ data, token });
};

let signUp = async (req, res) => {
    let data = await user.create(req.body);
    res.status(201).json(data);
};

module.exports = { home, login, signUp };