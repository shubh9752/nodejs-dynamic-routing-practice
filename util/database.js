const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-schema','root','9752',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;