const {DataTypes} = require('sequelize');
const db = require('../db');

const Deck = db.define('list', {
    ownerId: {
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

module.exports = Deck;