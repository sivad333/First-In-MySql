'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    uuid : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    is_active : {
        type : DataTypes.BOOLEAN,
        defaultValue : true
    },
}, {
    timestamps: true,
    tableName : 'categories'
});

console.log(User === sequelize.models.User); 