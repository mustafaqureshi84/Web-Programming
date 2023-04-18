let ordersModel = (sequelize, Sequelize) => {
    class Order extends Sequelize.Model { };
    Order.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['pending', 'fulfill', 'canceled']]
            }
        }
    }, {
        sequelize,
        modelName: 'orders'
    });
    return Order;
};

module.exports = ordersModel;