'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

let category = require('./routes/category');
let book = require('./routes/book');

app.use(cors());
app.use(express.json({limit: '6mb'}));
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/category",category);
app.use("/api/v1/book",book);

app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`));