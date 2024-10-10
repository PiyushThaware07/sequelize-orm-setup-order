module.exports = (sequelize, DataTypes) => {
    console.log("user table");
    const User = sequelize.define('User', {
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        tableName : "user",
        freezeTableName: true,
    });

    // Associate with Address
    User.associate = (models) => {
        console.log("associate user ");
        User.hasOne(models.Address, { foreignKey: 'user_id' });
        User.hasOne(models.Social, { foreignKey: "user_id" });
    };

    return User;
};
