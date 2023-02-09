'use strict'

const router = require("express").Router();
const Joi = require('joi');

var database = require('../database');
const Category = require('../models/Category');

router.post("/create", async(req, res)=>{
    try {
        const validData = {
            first_name : req.body.first_name,
	        last_name : req.body.last_name
        }
        
        var query = `
        INSERT INTO categories 
        (first_name, last_name) 
        VALUES ("${validData.first_name}", "${validData.last_name}")
        `;

        database.query(query, function(error, data){
            if(error){
                return res.status(400).send(error.message);
            }else{
                return res.status(200).send({
                    status : true,
                    message : 'Sample Data Inserted',
                    data : validData
                });
            }
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get('/all', async(req,res)=>{
    try {
        var query = 'select * from user order by id desc';

        database.query(query, function(error, data){
            if(error){
                return res.status(400).send(error.message);
            }else{
                return res.status(200).send({
                    status : true,
                    message : 'Data Fetched',
                    data : data
                });
            }
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get('/edit/:id', async(req,res)=>{
    try {
        var id = req.params.id;
        var query = `select * from user where id = ${id}`;

        database.query(query, function(error, data){
            if(error){
                return res.status(400).send(error.message);
            }else{
                return res.status(200).send({
                    status : true,
                    message : 'Data Fetched',
                    data : data
                });
            }
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.put('/update/:id', async(req,res)=>{
    try {
        var id = req.params.id;
        let UpdateSchema = Joi.object({
            first_name : Joi.string().required(),
            last_name : Joi.string().required()
        });

        const validData = await UpdateSchema.validateAsync(req.body);

        var query = 
        `UPDATE user 
        SET first_name = "${validData.first_name}", 
        last_name = "${validData.last_name}"
        WHERE id = ${id}
        `;

        database.query(query, function(error, data){
            if(error){
                return res.status(400).send(error.message);
            }else{
                return res.status(200).send({
                    status : true,
                    message : 'Updated Successfully',
                    data : validData
                });
            }
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.delete('/delete/:id', async(req,res)=>{
    try {
        var id = req.params.id;

        var query = 
        `delete from user where id = ${id}`;

        database.query(query, function(error, data){
            if(error){
                return res.status(400).send(error.message);
            }else if(data.affectedRows === 0){
                return res.status(400).send({
                    status : false,
                    message : 'Unable to Delete'
                });
            }
            else{
                return res.status(200).send({
                    status : true,
                    message : 'Deleted Successfully',
                });
            }
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;