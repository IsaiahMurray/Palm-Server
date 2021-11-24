const {DataTypes} = require('sequelize');
const db = require('../db');

const Page = db.define('page', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notebookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Page;