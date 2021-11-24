const {DataTypes} = require('sequelize');
const db = require('../db');

const Notebook = db.define('notebookCategory', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Notebook;