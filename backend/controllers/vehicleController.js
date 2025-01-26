const {Vehicle} = require('../db');
const constants = require('../constants');

const vehicleController = {};

// CRUD for vehicles

vehicleController.operationsAddVehicle = async(req,res) =>{
    try {
        const { name , vehicleType} = req.body;
        const userType = req.user.type;
        if(name === null || vehicleType === null){
            res.status(500).json({message:"Vehicle name or type not sent"})
        }
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to enter these details"});
        }
        await Vehicle.create({name, vehicleType});
        res.status(200).json({message:'Vehicle Added Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error Adding vehicle"});
    }
}
vehicleController.operationsGetAllVehicles = async(req,res) =>{
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json({message:'Vehicle Added Successfully',data:vehicles});
    } catch(err) {
        res.status(500).json({message:"Error fetching all vehicle"});
    }
}
vehicleController.operationsEditVehicle = async(req,res) =>{
    try {
        const { name , vehicleType, vehicleId} = req.body;
        const userType = req.user.type;
        if(name === null || vehicleType === null || vehicleId){
            res.status(500).json({message:"Vehicle name or type not sent"})
        }
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to enter these details"});
        }
        const data = {
            name,
            vehicleType
        };
        await Vehicle.update(data, {where :{id: vehicleId}});
        res.status(200).json({message:'Vehicle updated Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error updating vehicle"});
    }
}
vehicleController.operationsDeleteVehicle = async(req,res) =>{
    try {
        const {vehicleId} = req.body;
        const userType = req.user.type;
        if(vehicleId === null){
            res.status(500).json({message:"Vehicle Id not sent"})
        }
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to delete"});
        }
        await Vehicle.destroy({where :{id: vehicleId}});
        res.status(200).json({message:'Vehicle updated Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error updating vehicle"});
    }
}


module.exports = vehicleController;