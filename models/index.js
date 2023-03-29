const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
}
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.admin = require('./adminModel')(sequelize);
db.user = require('./userModel')(sequelize, Sequelize);
db.order = require('./ordersModel')(sequelize);
db.product = require('./productsModel')(sequelize);
db.cart = require('./cartModel')(sequelize);
db.feedback = require('./feedbackModel')(sequelize);

db.user.hasMany(db.order);
db.product.hasMany(db.order);
db.user.hasOne(db.cart);
db.product.hasMany(db.cart);
db.user.hasMany(db.feedback);
db.product.hasMany(db.feedback);

module.exports = db;