const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: true
  }
);

// Import models here
const User = require('./models/Users')(sequelize, DataTypes);
const Vehicle = require('./models/Vehicle')(sequelize, DataTypes);
const VehicleComponent = require('./models/VehicleComponent')(sequelize, DataTypes);
const UserComplaints = require('./models/UserComplaints')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Vehicle,
  VehicleComponent,
  UserComplaints
};
