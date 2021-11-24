const {DataTypes} = require('sequelize');
const db = require('../db');

const List = db.define('list', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = List;