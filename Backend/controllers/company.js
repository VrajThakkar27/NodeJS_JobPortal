const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const company = require('../models/company.js');
const student = require('../models/student.js');
// const sendCookie = require('../utility/features.js');

const registerCompany=(req,res)=>{
    res.render('company');
}
const registerCompanyPost=async(req,res)=>{
    const {name,email,password,confirmPassword,website,age,cpi,position ,package,description}=req.body;
    let yo2 = await company.findOne({ email });
    if (yo2) {
        return res.status(404).json({
            success: false,
            message: 'User already exists',
        })
    }
    if(password!=confirmPassword)
    {     
        alert('Passsword doesnot match the confirm password');
        return res.status(404).json({
            success:false,
            message:'Passsword does not match the confirm password',
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    yo2 = await company.create({
        name,
        email,
        password: hashedPassword,
        website,
        age,
        cpi,
        position,
        package,
        description,
    });
    //Company is created and stored now for cookies-
    const t=jwt.sign({_id:yo2._id},'123');
    res.status(201).cookie('token',t,{
        httpOnly:true,
        maxAge:15*60*1000,
        // sameSite:process.env.NODE_ENV==='Development'?'lax': 'none',//If same site is none then frontend and backend can have different domain link and for that secure must be true
        // secure:process.env.NODE_ENV==='Development'?false:true,
    })
    res.render("companyDetails",{data:yo2});
}
const loginCompany=(req,res)=>{
    res.render('loginCompany');
}
const loginCompanyPost=async (req,res)=>{
    const { email, password } = req.body;
    let yo2 = await company.findOne({ email });
    //We have given password select as false so we can't directly access the password 
    
    if (!yo2) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        })
    }
    const isMatch = await bcrypt.compare(password, yo2.password);
    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        })
    }
    const t=jwt.sign({_id:yo2._id},'123');
    res.status(201).cookie('token',t,{
        httpOnly:true,
        maxAge:15*60*1000,
        // sameSite:process.env.NODE_ENV==='Development'?'lax': 'none',//If same site is none then frontend and backend can have different domain link and for that secure must be true
        // secure:process.env.NODE_ENV==='Development'?false:true,
    })
    res.render("companyDetails",{data:yo2});
}
const getCompany = async (req,res)=>{
    const s = await student.findOne({_id:req.params.id});
    const c = await company.find();
    console.log(s);
    res.render("getCompany",{data:{s:s,c:c}});
  }
module.exports.c1=registerCompany;
module.exports.c2=registerCompanyPost;
module.exports.c3=loginCompany;
module.exports.c4 =loginCompanyPost;
module.exports.c5 =getCompany;