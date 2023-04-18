let productsModel = (sequelize, Sequelize) => {
    class Product extends Sequelize.Model { };
    Product.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                isNumeric: true,
                min: 1,
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [10, 60],
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                isNumeric: true,
                min: 0,
            }
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'products',
        timestamps: false
    });
    return Product;
};

module.exports = productsModel;