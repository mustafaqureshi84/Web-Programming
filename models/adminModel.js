const { DataTypes, Model } = require('sequelize');

let adminModel = (sequelize) => {
    class Admin extends Model { };
    Admin.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 5,
                max: 25
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'admins',
        timestamps: false
    });
    return Admin;
};

module.exports = adminModel;