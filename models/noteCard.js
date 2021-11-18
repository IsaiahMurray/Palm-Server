const {DataTypes} = require('sequelize');
const db = require('../db');

const NoteCard = db.define('noteCard', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deckId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    front: {
        type: DataTypes.STRING,
        allowNull: false
    },
    back: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hint: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = NoteCard;