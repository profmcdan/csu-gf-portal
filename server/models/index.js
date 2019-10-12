require('dotenv').config();

const Sequelize = require('sequelize');
const config = require('../config/keys');

const db = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
});

const User = require('./user')(db, Sequelize);
const Profile = require('./profile')(db, Sequelize);

module.exports = {
  db,
  User,
  Profile,
};
