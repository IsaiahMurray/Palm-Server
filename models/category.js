const {DataTypes} = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iconId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Category;