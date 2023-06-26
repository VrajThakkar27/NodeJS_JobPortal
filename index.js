const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const app = express();
const studentRouter=require('./Backend/routes/student.js');
const companyRouter=require('./Backend/routes/company.js');

mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'BackendProject',
}).then(() => console.log('Database connected'))
    .catch((e) => console.log(e));

app.set('view engine', 'ejs');//Set view engine as ejs
app.use(express.json());

app.set("views", path.join(__dirname, "Frontend/views"));
app.use(express.static("Frontend/public"));

app.use(express.urlencoded({ extended: true }));//Gets data from post request
app.use(cookieParser());

app.use('/WOC_NodeJS_JobPortal',studentRouter);
app.use('/WOC_NodeJS_JobPortal',companyRouter);

app.listen(5000,()=>{
    console.log('Server is working');
})
