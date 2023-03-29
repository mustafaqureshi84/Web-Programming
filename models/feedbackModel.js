const { DataTypes, Model } = require('sequelize');

let feedbackModel = (sequelize) => {
    class Feedback extends Model { };
    Feedback.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [10, 60],
            }
        }
    }, {
        sequelize,
        modelName: 'feedbacks',
        timestamps: false
    });
    return Feedback;
};

module.exports = feedbackModel;