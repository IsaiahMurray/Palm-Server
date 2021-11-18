const {DataTypes} = require('sequelize');
const db = require('../db');

const Notebook = db.define('list', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    notebookCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Notebook;