module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define("Vehicle", {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleType:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },

    });
    return Vehicle;
}