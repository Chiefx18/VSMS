const constants = require('../constants');
const { UserComplaints , sequelize } = require("../db");
const moment = require('moment');


const operationsController = {};

operationsController.resolveComplaint = async (req,res)=>{
    try {
        const { complaintId } = req.body;
        const userType = req.user.type;
        if(userType !== constants.USER_TYPE.OPERATIONS){
            res.status(401).json({message:"You are not allowed to enter these details"});
        }
        const complaints = await UserComplaints.findAll({where:{id:complaintId}});
        complaints[0].dataValues.resolve = true;
        await UserComplaints.update(complaints[0].dataValues, { where :{id : complaintId}});
        res.status(200).json({message:"Complaint Resolved"});

    } catch(err) {
        res.status(500).json({message:"Error resolving complaint"});
    }
}

operationsController.getRevenue = async (req,res)=>{
   try { 
    const { type } = req.user;
    if(type !== constants.USER_TYPE.OPERATIONS){
        res.status(401).json({message:"You are not allowed to view these details"});
    }
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

        const revenueData = await UserComplaints.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('SUM', sequelize.col('price')), 'totalRevenue'], 
            ],
            group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']], 
            limit: limit,
            offset: offset, 
            raw: true, 
        });
        const formattedData = revenueData.map(item => ({
            date: moment(item.date).format('YYYY-MM-DD'), 
            totalRevenue: item.totalRevenue
        }));

        res.status(200).json({message:"Revenue fetched successfully", revenue: formattedData });
    } catch(err){
        res.status(500).json({message:"Error fetching revenue"});
    }
}

module.exports = operationsController;