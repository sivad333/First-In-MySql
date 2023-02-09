'use strict'

const {Sequelize, DataTypes} = require("sequelize");
const crypto = require('crypto');

const sequelize = new Sequelize(
    'first',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
 );
 
 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const Book = sequelize.define("books", {
    uuid : {
        type: DataTypes.UUID,
        defaultValue: 'BOOK-'+ crypto.pseudoRandomBytes(4).toString('hex').toUpperCase()
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    subject: {
      type: DataTypes.INTEGER,
    }
 },{
    timestamps: true,
    tableName : 'books'
 });
 
sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = Book;