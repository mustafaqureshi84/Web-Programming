let cartModel = (sequelize, Sequelize) => {
    class Cart extends Sequelize.Model { };
    Cart.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        sequelize,
        modelName: 'carts',
        timestamps: false
    });
    return Cart;
};

module.exports = cartModel;