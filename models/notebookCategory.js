const {DataTypes} = require('sequelize');
const db = require('../db');

const Notebook = db.define('list', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Notebook;