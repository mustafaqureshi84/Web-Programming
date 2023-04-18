let feedbackModel = (sequelize, Sequelize) => {
    class Feedback extends Sequelize.Model { };
    Feedback.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feedback: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [10, 60],
            }
        }
    }, {
        sequelize,
        modelName: 'feedbacks'
    });
    return Feedback;
};

module.exports = feedbackModel;