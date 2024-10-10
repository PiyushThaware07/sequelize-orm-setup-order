module.exports = (sequelize, DataTypes) => {
    console.log("address table");
    const Address = sequelize.define('Address', {
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
    }, {
        tableName: 'address',
        freezeTableName: true,
    });

    // Associate with User
    Address.associate = (models) => {
        console.log("associate address ");
        Address.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Address;
};
