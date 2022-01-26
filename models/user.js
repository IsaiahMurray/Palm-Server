const {DataTypes} = require('sequelize');
const db = require('../db');

    const User = db.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false
        }
        // profilePicture: {
        //     type: DataTypes.
        // }
    })

    module.exports = User;