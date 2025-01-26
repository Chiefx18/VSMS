const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../db'); 

const JWT_SECRET = process.env.JWT_SECRET

const authController ={};

authController.signup = async (req,res) =>{
    try{
        const {name, email, password, userType} =  req.body;
        const hashedPassword  = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword, userType});
        res.status(201).json({ message: 'User created successfully' });
    } catch(err){
        res.status(500).json({ message: 'Error Creating User'});
    }

}
authController.login = async (req,res) =>{
    try{
        const { email, password} =  req.body;
        const userDetails = await User.findOne({ where: { email } });
        if(!userDetails || userDetails === undefined){
            res.status(500),json({message:'Not a valid Email-Id'});
        }
        const isPasswordValid  = await bcrypt.compare(password, userDetails.dataValues.password);
        if(!isPasswordValid){
            res.status(500),json({message:'Not a valid Password'});
        }
        const token = jwt.sign(
            { userId: userDetails.dataValues.id, 
              email: userDetails.dataValues.email,
              type: userDetails.dataValues.userType
            },
            JWT_SECRET,
            { expiresIn: '4h' }
        );
        res.json({ message: 'Login successful', token:`Bearer ${token}`});
    } catch(err){
        res.status(500).json({ message: 'Error Logging in'});
    }

}
authController.verifyToken = async (req,res,next) =>{
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            res.status(403).json({message:'No token provided'});
        }
        const decodedDetails = jwt.verify(token, JWT_SECRET);
        req.user = decodedDetails;
        next();
    } catch(err){
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}




module.exports = authController;