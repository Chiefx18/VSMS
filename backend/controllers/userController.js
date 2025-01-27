const constants = require("../constants");
const {UserComplaints} = require('../db');
const userController = {};

userController.getUserProfile = async (req,res) => {
    try {
        const userDetails = req.user;
        res.status(200).json({message:"User profile fetched Successfully", data:userDetails}); 
    } catch (err){
        res.status(500).json({message:"Error fetching user profile"});
    }
}

userController.registerComplaints = async (req,res) =>{
    try {
        const { vehicleId, description, componentId, quantity, payment, price, resolve } = req.body;
        const userDetails = req.user;
        const { userId }= userDetails;
        await UserComplaints.create({
            userId,
            vehicleId,
            description,
            componentId,
            quantity,
            payment,
            price,
            resolve
        });
        res.status(200).json({message:"Complaint Registered Successfully", data:userDetails}); 
    } catch (err){
        res.status(500).json({message:"Error registering complaint"});
    }
}

userController.getUserComplaints = async (req,res) =>{
    try {
        const userDetails = req.user;
        const id = userDetails.userId;
        const complaints = await UserComplaints.findAll({where:{userId:id}});
        res.status(200).json({message:"All Complaints fetched Successfully", data:complaints}); 
    } catch (err){
        res.status(500).json({message:"Error fetching complaints"});
    }
}
userController.getAllUserComplaints = async (req,res) =>{
    try {
        const userDetails = req.user;
        const id = userDetails.userId;
        const complaints = await UserComplaints.findAll();
        res.status(200).json({message:"All Complaints fetched Successfully", data:complaints}); 
    } catch (err){
        res.status(500).json({message:"Error fetching complaints"});
    }
}

userController.payForComplaint = async (req,res) =>{
    try {
        const {complaintId} = req.body ;
        const complaints = await UserComplaints.findAll({where:{id:complaintId}});
        complaints[0].dataValues.payment = true;
        await UserComplaints.update(complaints[0].dataValues, { where :{id : complaintId}});
        res.status(200).json({message:"Payment paid successfully", data:complaints}); 
    } catch (err){
        res.status(500).json({message:"Error in payments"});
    }
}



module.exports = userController;