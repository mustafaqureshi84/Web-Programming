const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
}
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.admin = require('./adminModel')(sequelize, Sequelize);
db.user = require('./userModel')(sequelize, Sequelize);
db.order = require('./ordersModel')(sequelize, Sequelize);
db.product = require('./productsModel')(sequelize, Sequelize);
db.cart = require('./cartModel')(sequelize, Sequelize);
db.feedback = require('./feedbackModel')(sequelize, Sequelize);
db.Op = Op;

db.user.hasMany(db.order);
db.product.hasMany(db.order);
db.user.hasOne(db.cart);
db.product.hasMany(db.cart);
db.user.hasMany(db.feedback);
db.product.hasMany(db.feedback);

module.exports = db;