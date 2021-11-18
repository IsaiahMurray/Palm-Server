const {DataTypes} = require('sequelize');
const db = require('../db');

const Habit = db.define('habit', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    repeat: {
        type: DataTypes.BOOLEAN,
        allownull: true
    },
    goal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    iconId: {
        type: DataTypes.INTEGER,
        allownull: true
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    timeOfDay: {
        type: DataTypes.ENUM('morning', 'afternoon', 'evening', 'night'),
        allowNull: true
    },
    timeReminder: {
        type: DataTypes.TIME,
        allowNull: true
    },
    locationReminder:{
        type: DataTypes.STRING,
        allowNull: true
    },
    repeatFrequecncy: {
        type: DataTypes.ENUM('daily', 'twice weekly', 'weekly', 'monthly'),
        allowNull: true
    },
    repeatAmount: {
        type: DataTypes.INTEGER,
        allownull: true
    },
    customRepeatDays: {
        //Make array?
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Habit;