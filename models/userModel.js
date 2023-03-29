const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let userModel = (sequelize, Sequelize) => {
    class User extends Sequelize.Model { };
    User.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 5,
                max: 25
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 100
            }
        },
        contact: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true
            }
        }
    }, {
        sequelize,
        modelName: 'user',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                let salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    });

    User.prototype.token = function () {
        return jwt.sign({ emial: this.email, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    }

    return User;
};


module.exports = userModel;