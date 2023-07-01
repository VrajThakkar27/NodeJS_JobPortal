const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const student = require('../models/student.js');
// const sendCookie = require('../utility/features.js');

const home=(req,res)=>{
    res.render('home');
}
const registerStudent=(req,res)=>{
    res.render('student');
}
const registerStudentPost=async(req,res)=>{
    const {name,email,password,confirmPassword,batch,cpi,age,gender,qualification}=req.body;
    let yo1 = await student.findOne({ email });
    if (yo1){
        return res.status(404).json({
            success: false,
            message: 'User already exists',
        })
    }
    if(password!=confirmPassword)
    {
        // alert('Passsword doesnot match the confirm password');
        return res.status(404).json({
            success:false,
            message:'Passsword doesnot match the confirm password',
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    yo1 = await student.create({
        name,
        email,
        password: hashedPassword,
        cpi,
        batch,
        age,
        gender,
        qualification,
    });
    //Student is created and stored now for cookies-
    const t=jwt.sign({_id:yo1._id},'123');
    res.status(201).cookie('token',t,{
        httpOnly:true,
        maxAge:15*60*1000,
        // sameSite:process.env.NODE_ENV==='Development'?'lax': 'none',//If same site is none then frontend and backend can have different domain link and for that secure must be true
        // secure:process.env.NODE_ENV==='Development'?false:true,
    })
    res.render("studentDetails",{data:yo1});
}
const loginStudent=(req,res)=>{
    res.render('loginStudent');
}
const loginStudentPost=async (req,res)=>{
    const { email, password } = req.body;
    let yo1 = await student.findOne({ email });
    //We have given password select as false so we can't directly access the password 
    
    if (!yo1) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        })
    }
    const isMatch = await bcrypt.compare(password, yo1.password);
    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        })
    }
    const t=jwt.sign({_id:yo1._id},'123');
    res.status(201).cookie('token',t,{
        httpOnly:true,
        maxAge:15*60*1000,
        // sameSite:process.env.NODE_ENV==='Development'?'lax': 'none',//If same site is none then frontend and backend can have different domain link and for that secure must be true
        // secure:process.env.NODE_ENV==='Development'?false:true,
    })
    res.render("studentDetails",{data:yo1});
}
module.exports.s1=home;
module.exports.s2=registerStudent;
module.exports.s3=registerStudentPost;
module.exports.s4=loginStudent;
module.exports.s5=loginStudentPost;