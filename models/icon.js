const {DataTypes} = require('sequelize');
const db = require('../db');

const Icon = db.define('icon',{
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
})

module.exports = Icon;