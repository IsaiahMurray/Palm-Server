const {DataTypes} = require('sequelize');
const db = require('../db');

const Page = db.define('list', {
    ownerId: {
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