const {VehicleComponent} = require('../db');
const constants = require('../constants');

const componentController = {};

// CRUD for vehicle Components 

componentController.operationsAddComponent = async(req,res) =>{
    try {
        const { name , vehicleId, price, quantity } = req.body;
        const userType = req.user.type;
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to enter these details"});
        }
        if(name === null || vehicleId === null || price === null || quantity === null){
            res.status(500).json({message:"Component details not sent"})
        }
        await VehicleComponent.create({name, vehicleId, price, quantity});
        res.status(200).json({message:'Component Added Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error Adding Component"});
    }
}
componentController.operationsGetAllVehicleComponents = async(req,res) =>{
    try {
        const { vehicleId } = req.query;
        const components = await VehicleComponent.findAll({where :{vehicleId:vehicleId}});
        res.status(200).json({message:'Component Fetched Successfully',data:components});
    } catch(err) {
        res.status(500).json({message:"Error fetching components"});
    }
}
componentController.operationsGetAllComponents = async(req,res) =>{
    try {
        const components = await VehicleComponent.findAll();
        res.status(200).json({message:'All Components Fetched Successfully',data:components});
    } catch(err) {
        res.status(500).json({message:"Error fetching all components"});
    }
}
componentController.operationsEditComponent = async(req,res) =>{
    try {
        const { name , vehicleId, price, quantity, componentId} = req.body;
        const userType = req.user.type;
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to enter these details"});
        }
        if(name === null || vehicleId === null || price === null || quantity === null){
            res.status(500).json({message:"Component details not sent"})
        }
        const data = {
            name,
            vehicleId,
            price,
            quantity,
        };
        await VehicleComponent.update(data, {where :{id: componentId}});
        res.status(200).json({message:'Component updated Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error updating Component"});
    }
}
componentController.operationsDeleteComponent = async(req,res) =>{
    try {
        const {componentId} = req.body;
        const userType = req.user.type;
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to delete"});
        }
        if(componentId === null){
            res.status(500).json({message:"Component Id not sent"})
        }
        await VehicleComponent.destroy({where :{id: componentId}});
        res.status(200).json({message:'Component deleted Successfully'});
    } catch(err) {
        res.status(500).json({message:"Error deleting Component"});
    }
}

module.exports = componentController;