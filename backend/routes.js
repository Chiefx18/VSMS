const express = require('express');
const router = express.Router();

// // Import controller files
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const operationsController = require('./controllers/operationsController');
const vehicleController = require('./controllers/vehicleController');
const componentController = require('./controllers/componentController');

//Auth Route
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/verifyToken', authController.verifyToken);

// User Routes
router.get('/user',authController.verifyToken, userController.getUserProfile);
router.get('/user/complaints', authController.verifyToken, userController.getAllUserComplaints)
router.post('/user/registerComplaint',authController.verifyToken, userController.registerComplaints);
router.post('/user/pay',authController.verifyToken, userController.payForComplaint);

// Operations Route
router.post('/operations/resolve',authController.verifyToken, operationsController.resolveComplaint);
router.get('/operations/revenue',authController.verifyToken, operationsController.getRevenue);

// Vehicle Routes
router.post('/vehicle/add', authController.verifyToken, vehicleController.operationsAddVehicle);
router.get('/vehicle', vehicleController.operationsGetAllVehicles);
router.put('/vehicle/edit',authController.verifyToken, vehicleController.operationsEditVehicle);
router.delete('/vehicle/delete',authController.verifyToken, vehicleController.operationsDeleteVehicle);

// Component Routes
router.post('/component/add', authController.verifyToken, componentController.operationsAddComponent);
router.get('/component', componentController.operationsGetAllComponents);
router.put('/Component/edit',authController.verifyToken, componentController.operationsEditComponent);
router.delete('/Component/delete',authController.verifyToken, componentController.operationsDeleteComponent);

// Health 
router.get('/health',(req,res)=>{
    res.send('App is working')
})

module.exports = router;
