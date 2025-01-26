module.exports = (sequelize, DataTypes) => {
    const VehicleComponent = sequelize.define("VehicleComponent", {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    });
    return VehicleComponent;
}