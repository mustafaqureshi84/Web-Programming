const { DataTypes, Model } = require('sequelize');

let cartModel = (sequelize) => {
    class Cart extends Model { };
    Cart.init({
        id: {
            type: DataTypes.INTEGER,
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