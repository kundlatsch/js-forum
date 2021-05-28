module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING(3000),
            allowNull: false,
        },
    });

    return Comments;
}