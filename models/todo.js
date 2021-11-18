const {DataTypes} = require('sequelize');
const db = require('../db');

const Todo = db.define('todo', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    subCategoryId:{
        type: DataTypes.INTEGER,
        allowNull: true
     }
})

module.exports = Todo;