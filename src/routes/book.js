'use strict'

const router = require('express').Router();
const Joi = require('joi');

const Book = require('../models/Book');
const {Sequelize, DataTypes} = require("sequelize");

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

router.post('/create', async(req,res)=>{
    try {
        const CreateSchema = Joi.object({
            title : Joi.string().required(),
            author : Joi.string().required(),
            release_date : Joi.date().required(),
            subject : Joi.number().required()
        });

        const validData = await CreateSchema.validateAsync(req.body);

        sequelize.sync().then(() => {
            Book.create({
                title : validData.title,
                author : validData.author,
                release_date : validData.release_date,
                subject : validData.subject
            }).then(result => {
                return res.status(200).send(result);
            }).catch((error) => {
                return res.status(400).send(error.message);
            });
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;