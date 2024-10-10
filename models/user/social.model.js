module.exports = (sequelize, DataTypes) => {
    console.log("social table");
    const Social = sequelize.define('Social', {
        github: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        leetcode: DataTypes.STRING,
        hackerrank: DataTypes.STRING,
        gfg: DataTypes.STRING,
        codechef: DataTypes.STRING,
        codeforces: DataTypes.STRING,
    }, {
        tableName: 'social',
        freezeTableName: true,
    });

    // Associate with Address
    Social.associate = (models) => {
        console.log("associate social ");
        Social.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Social;
};
