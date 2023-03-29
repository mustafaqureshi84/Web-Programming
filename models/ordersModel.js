const { DataTypes, Model } = require('sequelize');

let ordersModel = (sequelize) => {
    class Order extends Model { };
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'orders'
    });
    return Order;
};

module.exports = ordersModel;