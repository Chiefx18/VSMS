module.exports = (sequelize, DataTypes) => {
    const UserComplaints = sequelize.define("UserComplaints", {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        componentId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        payment:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            default:false,
        },
        resolve:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            default:false,
        },
    });
    return UserComplaints;
}